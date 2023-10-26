const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const AppError = require('./../utils/AppError');
const pool = require('./../Model/database');

const getFaculty = async (entityId, tableName, keyName, next) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tableName} WHERE ${keyName} = ?`,
    [entityId]
  );

  if (!rows[0]) return next(new AppError('No results found', 404));

  return rows[0];
};
exports.createFaculty = catchAsyncErrors(async (req, res, next) => {
  const { facultyName } = req.body;
  const [results] = await pool.query(
    `INSERT INTO Faculties(facultyName) VALUES(?)`,
    [facultyName]
  );

  res.status(201).json({
    status: 'success',
    faculty: await getFaculty(results.insertId, 'Faculties', 'facultyId', next),
    message: 'Faculty added successfully',
  });
});

exports.getAllFaculties = catchAsyncErrors(async (req, res, next) => {
  const [rows] = await pool.query(
    'SELECT * FROM Faculties WHERE facultyStatus=1'
  );

  res.status(200).json({
    status: 'success',
    faculties: rows,
  });
});

exports.deleteFaculty = catchAsyncErrors(async (req, res, next) => {
  //EDGE-CASE: if no faculty was selected
  if (!req.params.facultyId)
    return next(new AppError('No course was selected', 404));

  const results = await pool.query(
    'UPDATE Faculties SET facultyStatus = 0 WHERE facultyId=?',
    [+req.params.facultyId]
  );
  //EDGE-CASE: if no update happened (faculty doesn't exist)
  if (results.affectedRows === 0)
    return next(new AppError("faculty doesn't exist", 404));

  res.status(200).json({
    status: 'success',
    message: 'Deleted Successfully',
  });
});

exports.getDepartments = catchAsyncErrors(async (req, res, next) => {
  const [departments] = await pool.query(
    `SELECT departmentId, departmentName FROM Departments WHERE departmentStatus=1`
  );
  res.status(200).json({
    departments,
  });
});
