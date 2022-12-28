const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const AppError = require('./../utils/AppError');
const pool = require('../Model/database');
const { query } = require('../Model/database');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../view/public/img/users`);
  },
  filename: (req, file, cb) => {
    //user-id-timestamp.jpg
    const fileExt = file.mimetype.split('/')[1];

    cb(null, `user-${req.user.userId}-${Date.now()}.${fileExt}`);
  },
});

/**
 * The function below checks wether the uploaded file is an image or not
 * @param {*} req
 * @param {*} curFile
 * @param {*} cb
 */

const multerFilter = (req, curFile, cb) => {
  if (curFile.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

// exports.resizeUserPhoto = catchAsyncErrors(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);

//   next();
// });

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  //EDGE-CASE: Check if passwords are trying to updated
  if (req.body.userPassword || req.body.passwordConfirm || req.body.password)
    return next(
      new AppError('This is not the route for updating passwords', 400)
    );

  //EDGE-CASE: Check if the user privilege is trying to be updated
  const cloneObject = { ...req.body };

  if ('privilege' in cloneObject) delete cloneObject['privilege'];

  //EDGE-CASE: If theres no surname,otherNames or email address in the request body
  ['emailAddress', 'surName', 'otherNames'].forEach((el) => {
    if (cloneObject[el] === '') delete cloneObject[el];
  });

  //EDGE-CASE: Check if theres a file with request
  if (req.file) cloneObject.photo = req.file.filename;
  const columns = Object.keys(cloneObject).join('=?,') + '=?';

  const [rowsInfo] = await pool.query(
    `UPDATE Users SET ${columns} WHERE userId = ?`,
    [...Object.values(cloneObject), req.user.userId]
  );

  if (rowsInfo.affectedRows === 1) {
    const [results] = await pool.query(
      `SELECT surName,otherNames,indexNumber,photo,privilege,hasSecurityQuestionsSet FROM Users WHERE userId = ?`,
      [req.user.userId]
    );
    res.status(200).json({
      status: 'success',
      msg: 'Update was successful',
      user: results[0],
    });
  }
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const { indexNumber } = req.body;
  const [results] = await pool.query(
    'SELECT userId,surName,otherNames,indexNumber,photo FROM Users WHERE indexNumber = ?',
    [+indexNumber]
  );
  //EDGE-CASE: THERES NO STUDENT WITH THAT INDEX NUMBER
  if (!results[0]) return next(new AppError('No results found', 404));
  res.status(200).json({
    status: 'success',
    student: results[0],
  });
});

exports.addNewProfessor = catchAsyncErrors(async (req, res, next) => {
  //TODO: GET THE FacultyId,surName,emailAddress & otherNames FROM THE REQUEST BODY
  const { facultyId, surName, emailAddress, otherNames } = req.body;
  let obj = { facultyId, surName, emailAddress, otherNames };

  //TODO: CREATE THE DEFAULT PASSWORD AND HASH IT
  obj.userPassword = await bcrypt.hash(
    process.env.PROFESSOR_DEFAULT_PASSWORD,
    12
  );

  //TODO: CREATE THE PROFESSOR ACCOUNT IN THE DB
  const columns = Object.keys(obj).join(',');
  const questionMarkPlaceholders = Object.values(obj)
    .map((el) => '?')
    .join(',');

  const [results] = await pool.query(
    `INSERT INTO Users (${columns}) VALUES(${questionMarkPlaceholders})`,
    Object.values(obj)
  );

  //EDGE-CASE:IF THE PROFESSOR ACCOUNT WASN'T SAVED TO THE DB
  if (!results.insertId) {
    return next(
      new AppError(
        'Trouble adding professor, please check the information you provided',
        400
      )
    );
  }
  //IF THE PROFESSOR ACCOUNT WAS SAVED SUCCESSFULLY
  if (results.insertId) {
    res.status(201).json({
      status: 'success',
      msg: 'professor Added Successfully',
    });
  }
});
