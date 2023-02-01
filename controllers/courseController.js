const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const AppError = require('./../utils/AppError');
const getValuesString = require('./../utils/getValuesString');
const pool = require('./../Model/database');

const getCourse = async (entityId, tableName, keyName, next) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tableName} WHERE ${keyName} = ?`,
    [entityId]
  );

  if (!rows[0]) return next(new AppError('No results found', 404));

  return rows[0];
};

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  let columns;
  let cloneObject = { ...req.body };
  cloneObject.departmentId = req.user.departmentId;

  columns = Object.keys(cloneObject).join(',');

  let questionMarks = Object.values(cloneObject)
    .map((el) => '?')
    .join(','); //-> '????'

  const [results] = await pool.query(
    `INSERT INTO Courses(${columns}) VALUES(${questionMarks})`,
    [...Object.values(cloneObject)]
  );
  const course = await getCourse(results.insertId, 'Courses', 'courseId', next);

  res.status(201).json({
    status: 'success',
    course,
    message: 'Course added successfully!',
  });
});

exports.getSendCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await getCourse(
    +req.params.courseId,
    'Courses',
    'courseId',
    next
  );

  res.status(200).json({
    status: 'success',
    course,
  });
});

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  const cloneObject = { ...req.body };

  //TODO:
  let columnsAndValues = Object.keys(cloneObject)
    .map((columnName) => `${columnName} = ?`)
    .join(','); //-> cloumnName = ?,cloumnName = ?

  //TODO: Make the query to the DB
  const result = await pool.query(
    `UPDATE Courses SET ${columnsAndValues} WHERE courseId = ?`,
    [...Object.values(cloneObject), +req.params.courseId]
  );
  //EDGE-CASE: If no updates where made
  if (result[0].affectedRows === 0)
    return next(new AppError('No changes made', 400));

  res.status(200).json({
    status: 'success',
    message: 'Update Sucessfull :)',
  });
});

exports.getCourses = catchAsyncErrors(async (req, res, next) => {
  let queryStr = `SELECT * FROM Courses`;

  //EDGE-CASE: IF THE DATA IS BEING QUERIED BY facultyId
  queryStr = `SELECT * FROM Courses WHERE departmentId = ${req.user.departmentId} AND courseStatus=1`;

  const [courses] = await pool.query(queryStr);
  // console.log(results[0]);
  res.status(200).json({
    status: 'success',
    courses,
  });
});

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  if (!req.params.courseId)
    return next(new AppError('No course was selected', 404));

  const [results] = await pool.query(
    `UPDATE Courses SET courseStatus=0 WHERE courseId=?`,
    [+req.params.courseId]
  );

  //EDGE-CASE: if no update happened (course doesn't exist)
  if (results.affectedRows === 0)
    return next(new AppError("course doesn't exist", 404));

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
  });
});
