const bcrypt = require('bcryptjs');

const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const pool = require('./../Model/database');
const AppError = require('../utils/AppError');

exports.createOngoingAttendance = catchAsyncErrors(async (req, res, next) => {
  const { QRcodeId, lectureRoom } = req.query;
  const cloneObject = { ...req.body };

  //Make the professorId from the req.user
  cloneObject.userId = req.user.userId;
  cloneObject.QRcodeId = +QRcodeId;
  cloneObject.lectureRoom = lectureRoom;
  // console.log(cloneObject);

  let columns = Object.keys(cloneObject).join(',');

  let questionMarkPlaceholders = Object.values(cloneObject)
    .map((val) => '?')
    .join(',');

  // //TODO:
  //1. Create an ongoing attendance

  const [result] = await pool.query(
    `INSERT INTO OngoingAttendances (${columns}) VALUES (${questionMarkPlaceholders})`,
    [...Object.values(cloneObject)]
  );
  //EDGE-CASE: if the onging attendance entity was not created

  //2. update the QRcodes ongingattendance
  await pool.query(
    `UPDATE QRcodes SET isLocked = ?, ongoingAttendanceId = ?, professorId = ? WHERE QRcodeId = ?`,
    [0, result.insertId, req.user.userId, +QRcodeId]
  );

  //3. send a success message
  res.status(201).json({
    status: 'success',
    message: 'All good, attendance ongoing...',
  });
});

exports.checkSignedAttendanceValidility = catchAsyncErrors(
  async (req, res, next) => {
    //TODO: 1. Get the QRcode entity using the params(source = The scanned QRcode)
    const { QRcodeId } = req.params;

    const [QRcodeEntities] = await pool.query(
      `SELECT * FROM QRcodes WHERE QRcodeId = ?`,
      [+QRcodeId]
    );

    //TODO: Get the ongoing attendance by using ongoingAttendanceId on the QRcode entity
    const [ongoingEntities] = await pool.query(
      `SELECT * FROM OngoingAttendances WHERE ongoingAttendanceId = ?`,
      [+QRcodeEntities[0].ongoingAttendanceId]
    );

    //EDGE-CASE: If the time of signing the attendance has expired (currentTime > ongoingAttendance.endsAt)
    if (Date.now() > new Date(ongoingEntities[0].endsAt).getTime())
      return next(new AppError("Sorry Buddy,Time's out! :(", 406));

    //TODO: Get a random secret question and send it to the user to answer. NOTE:ATP user on the req object
    const randomIndexNum = Math.floor(Math.random() * (7 - 1 + 1)) + 0;

    //TODO: Query Security questions of user from DB
    const [results] = await pool.query(
      `SELECT securityQuestions FROM SecurityQuestionsAnswers WHERE userId = ?`,
      [req.user.userId]
    );
    const [securityQuestions] = results;
    // console.log(securityQuestions);

    res.status(200).json({
      status: 'success',
      secretQs: securityQuestions.securityQuestions[randomIndexNum],
      randomIndexNum,
      ongoingAttendanceId: ongoingEntities[0].ongoingAttendanceId,
      courseId: ongoingEntities[0].courseId,
    });
  }
);

exports.createSignedAttendance = catchAsyncErrors(async (req, res, next) => {
  const { secretAnswer } = req.body;
  const cloneObject = { ...req.params }; //{ongoingAttendanceId,courseId,randomIndex}

  //TODO: Create the date at which the attendance is being signed
  let currentTime = new Date(Date.now());
  cloneObject.createdAt = currentTime
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  cloneObject.userId = req.user.userId;
  cloneObject.ongoingAttendanceId = +cloneObject.ongoingAttendanceId;
  cloneObject.courseId = +cloneObject.courseId;

  //TODO: Compare the answer gotten from the user with the one in the DB
  const [results] = await pool.query(
    'SELECT securityAnswers FROM SecurityQuestionsAnswers WHERE userId = ?',
    [req.user.userId]
  );
  const [securityAnswers] = results;
  // console.log(securityQuestions);
  //EDGE-CASE: If the answer is incorrect
  if (
    !(await bcrypt.compare(
      secretAnswer.toLowerCase(),
      securityAnswers.securityAnswers[+cloneObject.randomIndex]
    ))
  ) {
    return next(new AppError('Oops, incorrect answer, try again!', 406));
  }

  //TODO: Create the keys & values string for the INSERT command
  delete cloneObject['randomIndex'];

  const columns = Object.keys(cloneObject).join(',');

  const values = Object.values(cloneObject);

  const questionMarkPlaceholders = Object.values(cloneObject)
    .map((el) => '?')
    .join(',');

  // console.log({ values });

  //TODO: create a signed attendance and send a success message
  await pool.query(
    `INSERT INTO SignedAttendances (${columns}) VALUES(${questionMarkPlaceholders})`,
    [...values]
  );

  res.status(200).json({
    status: 'success',
    message: 'Awesome job buddy! :)',
  });
});
/**
 * This function updates the timestamp for which the ongoingAttendance ended,as well as the
 * isLocked status of the QR code
 */
exports.endOngoingAttendance = catchAsyncErrors(async (req, res, next) => {
  //NOTE: creating the timestamp for which the ongoing attendance ended
  const currentTimeStampStr = new Date(Date.now())
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  const { ongoingAttendanceId } = req.params;

  //TODO: UPDATE THE ONGOINGATTENDANCES TABLE
  const [rowsInfo] = await pool.query(
    `UPDATE OngoingAttendances SET endsAt = ? WHERE ongoingAttendanceId = ?`,
    [currentTimeStampStr, +ongoingAttendanceId]
  );

  if (rowsInfo.affectedRows === 1) {
    await pool.query(
      `UPDATE QRcodes SET isLocked = 1,ongoingAttendanceId = null, professorId = null WHERE ongoingAttendanceId = ?`,
      [+ongoingAttendanceId]
    );

    res.status(200).json({
      status: 'success',
      message: 'Attendance ended successfully',
    });
  }
});

exports.getSignedAttendances = catchAsyncErrors(async (req, res, next) => {
  const { ongoingAttendanceId } = req.params;
  const [results] = await pool.query(
    `SELECT SignedAttendances.signedAttendanceId,Users.indexNumber, Users.surName,Users.otherNames,Users.photo, SignedAttendances.createdAt AS signedAt
  FROM  ((SignedAttendances
  INNER JOIN OngoingAttendances 
  ON SignedAttendances.ongoingAttendanceId = OngoingAttendances.ongoingAttendanceId)
  INNER JOIN Users ON Users.userId = SignedAttendances.userId ) WHERE OngoingAttendances.ongoingAttendanceId = ?
  `,
    [+ongoingAttendanceId]
  );
  // console.log(results);
  res.status(200).json({
    status: 'success',
    numberPresent: results.length,
    studentsPresent: results,
  });
});

exports.getSemesterAttendanceScores = catchAsyncErrors(
  async (req, res, next) => {
    const { courseId } = req.params;
    const { startDate, endDate } = req.body;
    // console.log({ courseId });

    const [results] = await pool.query(
      `SELECT  0.5 * COUNT(s_attendances.signedAttendanceId )  AS Total, students.indexNumber,students.surName,students.otherNames,students.photo
      FROM SignedAttendances AS s_attendances INNER JOIN Users AS students
      ON s_attendances.userId = students.userId
      WHERE s_attendances.courseId = ? AND s_attendances.createdAt >= ? 
      AND s_attendances.createdAt <= ?
      GROUP BY students.indexNumber`,
      [+courseId, startDate, endDate]
    );

    res.status(200).json({
      status: 'success',
      resultsCount: results.length,
      results,
    });
  }
);

exports.getCurrentProfessor = catchAsyncErrors(async (req, res, next) => {
  const [QRcodeEntities] = await pool.query(
    `SELECT * FROM QRcodes WHERE QRcodeId = ?`,
    [+req.params.QRcodeId]
  );
  //EDGE-CASE: IF THE QRCODE IS LOCKED
  if (QRcodeEntities[0].isLocked === 1)
    return next(new AppError('QRcode is locked', 423));

  //TODO: QUERY THE QRCODE DETAILS BASED OF THE REQ.PARAMS (QRcodeId)
  const [qrCodeInfo] = await pool.query(
    `SELECT surName,otherNames,photo,privilege,QRcodes.isLocked
  FROM Users
  INNER JOIN QRcodes
  ON Users.userId = QRcodes.professorId WHERE QRcodes.QRcodeId = ?`,
    [+req.params.QRcodeId]
  );
  //EDGE-CASE:IF NO DETAILS ARE FOUND ABOUT QRCODE OR QRCODE IS LOCKED
  /* if (qrCodeInfo.length === 0)
    return next(new AppError('Oops, locked :(', 423)); */

  //EDGE-CASE: IF THE QRCODE IS LOCKED
  /*  if (qrCodeInfo[0].isLocked) {
    res.status(400).json({
      status: 'rejected',
      message: 'Oops, locked :(',
    });
  } else {
  } */
  res.status(200).json({
    status: 'success',
    qrCodeDetails: qrCodeInfo[0],
  });
});

exports.getAttendancesStartedByProfessor = catchAsyncErrors(
  async (req, res, next) => {
    const [professorAttendances] = await pool.query(
      'SELECT * FROM OngoingAttendances WHERE userId = ? ORDER BY ongoingAttendanceId DESC LIMIT 30',
      [req.user.userId]
    );
    res.status(200).json({
      status: 'success',
      professorAttendances,
    });
  }
);

exports.createSignedAttendanceManually = catchAsyncErrors(
  async (req, res, next) => {
    const { userId, courseId, ongoingAttendanceId } = req.params;

    const [result] = await pool.query(
      `INSERT INTO SignedAttendances(userId,courseId,ongoingAttendanceId) VALUES(?,?,?)`,
      [+userId, +courseId, +ongoingAttendanceId]
    );
    //EDGE-CASE:
    if (!result.insertId)
      return next(
        new AppError('Unable to add student right now, please try again', 400)
      );
    const [results] = await pool.query(
      'SELECT * FROM SignedAttendances WHERE signedAttendanceId = ?',
      [result.insertId]
    );
    res.status(201).json({
      status: 'success',
      signedAttendance: results[0],
    });
  }
);
