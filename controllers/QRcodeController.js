const QRCode = require('qrcode');
const pool = require('./../Model/database');

const AppError = require('./../utils/AppError');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');

exports.generateQRcode = catchAsyncErrors(async (req, res, next) => {
  //Create the QRcode entity
  const [result] = await pool.query(
    `INSERT INTO QRcodes (lectureRoom) VALUES (?)`,
    [req.body.lectureRoom]
  );

  //EDGE-CASE: If a QR code entity could not be created in the DB
  if (!result.insertId)
    return next(
      new AppError(
        'Trouble generating QR code for this lecture room, please try again',
        500
      )
    );
  //QRcode data format: QRcodeId=result.insertId lectureRoom=lectureRoom
  //TODO: set the insertId as the  QRcode data
  const QRcodeUrl = await QRCode.toDataURL(
    `QRcodeId=${result.insertId} lectureRoom=${req.body.lectureRoom}`
  );

  //EDGE-CASE: If an actual QR code could not be generated
  if (typeof QRcodeUrl !== 'string') {
    console.log('QR CODE ERROR 💥💥💥:', QRcodeUrl);

    return next(
      new AppError(
        'Trouble generating QR code for this lecture room, please try again',
        500
      )
    );
  }

  //Query the QRcode entity from the DB
  /* const [qrCodeEntity] = await pool.query(
    `SELECT * FROM QRcodes WHERE QRcodeId = ?`,
    [result.insertId]
  ); */

  // Send it  to the user
  res.status(201).json({
    QRcodeUrl,
    // qrCodeEntity,
  });
});

exports.getAllQRcodes = catchAsyncErrors(async (req, res, next) => {
  const [lectureHallQRcodes] = await pool.query(
    `SELECT * FROM QRcodes WHERE lectureHallStatus=1`
  );
  res.status(200).json({
    status: 'success',
    lectureHallQRcodes,
  });
});

exports.deleteQRCode = catchAsyncErrors(async (req, res, next) => {
  //EDGE-CASE: If no lecture hall QR code was selected
  if (!req.params.QRcodeId)
    return next(new AppError('No lecture hall QR code selected', 404));

  const [results] = await pool.query(
    `UPDATE QRcodes SET lectureHallStatus=0 WHERE QRcodeId=?`,
    [+req.params.QRcodeId]
  );

  //EDGE-CASE: if no update happened (lecture hall doesn't exist)
  if (results.affectedRows === 0)
    return next(new AppError("Lecture hall doesn't exist", 404));

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
  });
});
