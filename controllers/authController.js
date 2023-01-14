//----CORE MODULES----//
const { promisify } = require('util');
const crypto = require('crypto');

//----3RD PARTY MODULES----//
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//----OWN MODULES----//
const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const AppError = require('./../utils/AppError');
const Email = require('./../utils/email');
const pool = require('./../Model/database');

///////////////////////////////////////////////////////////
/**
 * Fucntion responsible for signing the JWTs
 * @param {*} id
 * @returns
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
/**
 * Function responsible for sending JWTs & cookies to the client
 * @param {*} user
 * @param {*} statusCode
 * @param {*} req
 * @param {*} res
 */
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.userId);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.userPassword = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith('2') ? 'success' : 'fail',
    token,
    data: {
      user,
    },
  });
};

exports.signupStudent = catchAsyncErrors(async (req, res, next) => {
  //EDGE-CASE: WHEN PASSWORDS DON'T MATCH
  if (req.body.userPassword !== req.body.passwordConfirm)
    return next(new AppError('Passwords do not match, please try again', 400));
  //TODO: Create a shallow copy of the request's body
  const cloneObject = { ...req.body };

  //TODO: Hash the users password
  cloneObject.userPassword = await bcrypt.hash(cloneObject.userPassword, 12);

  delete cloneObject['passwordConfirm'];

  //TODO: Get the column names
  let columns = Object.keys(cloneObject).join(',');

  let questionMarkPlaceholders = Object.values(cloneObject)
    .map((el) => '?')
    .join(','); //Returns '???'

  const [results] = await pool.query(
    `INSERT INTO  Users(${columns}) VALUES(${questionMarkPlaceholders})`,
    [...Object.values(cloneObject)]
  );

  const [entities] = await pool.query(`SELECT * FROM Users WHERE UserId = ?`, [
    results.insertId,
  ]);

  // console.log(entities[0]);
  createSendToken(entities[0], 201, req, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { userPassword, emailAddress } = req.body;
  // console.log(req.body);
  const [result] = await pool.query(
    'SELECT * FROM Users WHERE emailAddress=?',
    [emailAddress]
  );

  const user = result[0];

  if (!user || !(await bcrypt.compare(userPassword, user.userPassword)))
    return next(new AppError('Invalid credentials, try again', 404));

  createSendToken(user, 200, req, res);
});

exports.authenticateUser = catchAsyncErrors(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(
        'You do not have access to this route! please try logging in again',
        401
      )
    );

  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // console.log(decodedPayload);

  const [results] = await pool.query(`SELECT * FROM Users WHERE userId = ?`, [
    decodedPayload.id,
  ]);
  const [stillExistingUser] = results;

  if (!stillExistingUser)
    return next(
      new AppError('Invalid credentials or user no longer exists', 403)
    );

  // console.log(stillExistingUser);

  req.user = stillExistingUser;

  next();
});
/**
 * Controls Authorization of actions with the API
 * @param  {...any} privileges
 * @returns
 */
exports.restrictTo = (...privileges) => {
  return (req, res, next) => {
    if (!privileges.includes(req.user.privilege))
      return next(
        new AppError("You don't have permission to perform this action", 401)
      );
    next();
  };
};

/**
 * A recursive function that generates an array of unique numbers between 1 to 30
 * (1 and 30 included)
 * @param {Array} arr The intially empty array
 * @param {Number} randomNum A random integer
 * @returns An array of unique integers
 */
const getSecretQuestionIds = (arr, randomNum = null) => {
  //The exit case:  when the array is full(ie it has 7 elements)
  if (arr.length >= 7) return arr;
  let currRandomNum = Math.floor(Math.random() * (30 - 1 + 1)) + 1; //Generates a random num between 1-30
  if (arr.includes(currRandomNum)) {
    getSecretQuestionIds(arr);
  } else {
    arr.push(currRandomNum);
    getSecretQuestionIds(arr, Math.floor(Math.random() * (30 - 1 + 1)) + 1); //Generates a random num between 1-30
  }
};

exports.getSecurityQuestions = catchAsyncErrors(async (req, res, next) => {
  //TODO: Generate 7 random numbers
  let questionsIds = [];
  getSecretQuestionIds(questionsIds);
  //TODO: Get security questions using the random numbers generated
  const [securityQuestions] = await pool.query(
    `SELECT question FROM SecurityQs WHERE questionId IN (${questionsIds.join(
      ','
    )})`
  );

  res.status(200).json({
    status: 'success',
    results: securityQuestions.length,
    securityQuestions,
  });
});

exports.createUsersQnAs = catchAsyncErrors(async (req, res, next) => {
  //NOTE: At point the user on the req object

  const cloneObject = { ...req.body };

  //TODO: Get all the questions into a single string
  let questions = Object.keys(cloneObject)
    .map((key) =>
      JSON.stringify(key.includes("'") ? key.replaceAll("'", '') : key)
    )
    .join(',');

  //TODO: Get all the answers into an array and hash each of them
  let answers = await Promise.all(
    Object.values(cloneObject).map(
      async (ans) => bcrypt.hash(ans.trim().toLowerCase(), 12) //HASHING THE CURRENT ANSWER OF THE ITERATION
    )
  );

  //TODO: JSON Stringify each of the hashed elements and put them into a single string
  answers = answers.map((ans) => JSON.stringify(ans)).join(',');

  const [results] = await pool.query(
    'INSERT INTO SecurityQuestionsAnswers(userId,securityQuestions,securityAnswers) VALUES(?,?,?)',
    [req.user.userId, `[${questions}]`, `[${answers}]`]
  );
  const [entities] = await pool.query(
    'SELECT * FROM SecurityQuestionsAnswers WHERE securityQA_id = ?',
    [results.insertId]
  );

  //TODO: IF THE SECURITY QUESTIONS AND ANSWERS ARE SET FOR A USER
  if (results.insertId) {
    await pool.query(
      `UPDATE Users SET hasSecurityQuestionsSet = 1 WHERE userId = ?`,
      [req.user.userId]
    );
    const [result] = await pool.query('SELECT * FROM Users WHERE userId=?', [
      req.user.userId,
    ]);
    res.status(200).json({
      status: 'success',
      user: result[0],
    });
  }
});

//UPDATE PASSWORD
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const cloneObject = { ...req.body };
  //TODO:
  const [result] = await pool.query(`SELECT * FROM Users WHERE userId = ?`, [
    req.user.userId,
  ]);

  //TODO: Compare the password stored in the DB with what the user inputs
  if (
    !(await bcrypt.compare(cloneObject.currentPassword, result[0].userPassword))
  )
    return next(
      new AppError(
        'Sorry buddy, current password is incorrect, please try again',
        400
      )
    );

  //TODO: Check if the password confirm is incorrect
  if (cloneObject.newPassword !== cloneObject.newPasswordConfirm)
    return next(new AppError('Passwords do not match, please try again', 400));

  try {
    //TODO: Hash the newly inputted password before saving it to the DB
    cloneObject.newPassword = await bcrypt.hash(cloneObject.newPassword, 12);

    const [results] = await pool.query(
      `UPDATE Users SET userPassword = ? WHERE userId = ?`,
      [cloneObject.newPassword, req.user.userId]
    );

    // console.log(results);

    res.status(200).json({
      status: 'success',
      message: 'Updated password successfully :)',
    });
  } catch (err) {
    console.log('PASSWORD UPDATE ERROR💥💥💥: ', err);
    return next(
      new AppError(
        'Sorry Buddy, trouble updating password. Please try again',
        400
      )
    );
  }
});

//FORGET PASSWORD
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const [user] = await pool.query(
    `SELECT * FROM Users WHERE emailAddress = ? LIMIT 1`,
    [req.body.emailAddress]
  );
  if (!user[0])
    return next(
      new AppError('No user with this email exists, try again !', 404)
    );

  //TODO:
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  let passwordResetExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  passwordResetExpiresAt = passwordResetExpiresAt
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', ''); //user gets 10 mins before the token expires

  //TODO:
  await pool.query(
    `UPDATE Users SET resetPasswordToken = ?,passwordResetExpires = ? WHERE emailAddress = ? `,
    [resetPasswordToken, passwordResetExpiresAt, user[0].emailAddress]
  );

  //TODO: Set the URL to which the password would be reset
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  try {
    await new Email(user[0], resetURL).sendPasswordResetMail();

    res.status(200).json({
      status: 'success',
      message: `We've sent you an email, please check your inbox`,
    });
  } catch (err) {
    //EDGE-CASE: IF THERES WAS AN ISSUE SENDING THE EMAIL
    await pool.query(
      `UPDATE Users SET resetPasswordToken=?,passwordResetExpires=? WHERE emailAddress = ?`,
      [null, null, req.body.emailAddress]
    );

    console.log(err);
    return next(new AppError('Error sending Email, please try again...', 500));
  }
});

//RESET PASSWORD
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm)
    return next(
      new AppError('Sorry buddy,passwords do not match, try again', 400)
    );

  let currentDate = new Date(Date.now())
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  const cryptedResetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const [user] = await pool.query(
    'SELECT * FROM Users WHERE resetPasswordToken=? AND passwordResetExpires >= ?',
    [cryptedResetToken, currentDate]
  );

  // console.log(user);

  if (!user[0])
    return next(new AppError('Invalid token or expired token', 400));

  const hashPassword = await bcrypt.hash(req.body.password, 12);

  await pool.query(
    `UPDATE Users SET userPassword =?,resetPasswordToken=?,passwordResetExpires=? WHERE emailAddress =?`,
    [hashPassword, null, null, user[0].emailAddress]
  );

  res.status(200).json({
    status: 'success',
    msg: 'Password reset successfully, you can now login with your new password.',
  });
});

exports.signoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('jwt', 'cookieOverwritingText', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
});
