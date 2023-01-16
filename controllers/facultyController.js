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
  const [rows] = await pool.query('SELECT * FROM Faculties');

  res.status(200).json({
    status: 'success',
    faculties: rows,
  });
});

exports.deleteFaculty = catchAsyncErrors(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await pool.query(
    'UPDATE Faculties SET facultyStatus = ? WHERE facultyId=?',
    [0, +facultyId]
  );
  console.log(result[0]);
  res.status(204).json({
    status: 'success',
  });
});
