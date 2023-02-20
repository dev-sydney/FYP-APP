const fs = require('fs');
const pool = require('./../Model/database');
const bcrypt = require('bcryptjs');

const professors = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/professors.json`, 'utf-8')
);
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/students.json`, `utf-8`)
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/courses.json`, 'utf-8')
);

const ongoingAttendances = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/ongoingAttendances.json`,
    'utf-8'
  )
);

const signedAttendances = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/signedAtttendances.json`,
    'utf-8'
  )
);
const assignments = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/assignedCoursesLecturers.json`,
    'utf-8'
  )
);
let valuesStr = ' ';

const importProfessorsData = async (valuesStr) => {
  let insertCommand = `INSERT INTO Users(surName,otherNames,emailAddress,privilege,departmentId,photo,userPassword,indexNUmber) VALUES${valuesStr}`;

  const [results] = await pool.query(insertCommand);
};
/**
 * This function is responsible for insertting the data parsed from the .json files into  the DB
 * @param {Array} dataArr The array of objects
 * @param {String} tableName The name of the table in the DB to which the data is being inserted into
 */
const importDevData = async (dataArr = [], tableName = '') => {
  let columns = Object.keys(dataArr[0]).join(',');
  let questionMarkPlaceholders = '';
  let values = [];

  dataArr.forEach((data) => {
    questionMarkPlaceholders = questionMarkPlaceholders.concat(
      ` (${Object.keys(data)
        .map((val) => '?')
        .join(',')})`
    );
  });

  dataArr.map((data) => values.push(Object.values(data)));
  values = values.flat();
  questionMarkPlaceholders = questionMarkPlaceholders
    .trimStart()
    .replaceAll(' (', ',(');

  const [results] = await pool.query(
    `INSERT INTO ${tableName} (${columns}) VALUES ${questionMarkPlaceholders}`,
    values.flat()
  );

  if (results.affectedRows > 1) console.log('Data Imported successfully✅✅✅');
  process.exit();
  // console.log({ values, columns, questionMarkPlaceholders });
};

/**
 * This function is responsible for deleting records in a particular table in the DB
 * @param {String} tableName The name of the table in the DB which we want to delete the records
 */
const deleteDevData = async (tableName = '') => {
  const [results] = await pool.query(`DELETE FROM ${tableName}`);

  if (results.affectedRows > 1) console.log('Data Deleted successfully✅✅✅');

  process.exit();
};

if (process.argv[2] === '--professors') {
  professors.forEach((el) => {
    valuesStr += ` (${Object.values(el)
      .map((el) => {
        if (el === 'test1234') {
          return bcrypt.hashSync(el, 12);
        } else {
          return el;
        }
      })
      .join(',')})`;

    valuesStr = valuesStr.trimStart().replaceAll(' ', ',');
  });
}
if (process.argv[2] === '--students') {
  students.forEach((el) => {
    valuesStr += ` (${Object.values(el)
      .map((el) => {
        if (el === 'test1234') {
          return bcrypt.hashSync(el, 12);
        } else {
          return el;
        }
      })
      .join(',')})`;

    valuesStr = valuesStr.trimStart().replaceAll(' ', ',');
  });
}

if (process.argv[2] === '--import-courses') {
  importDevData(courses, 'Courses');
  // console.log('first');
}

if (process.argv[2] === '--import-ongoing') {
  importDevData(ongoingAttendances, 'OngoingAttendances');
}

if (process.argv[2] === '--import-signed') {
  importDevData(signedAttendances, 'SignedAttendances');
}

if (process.argv[2] === '--import-assignments') {
  importDevData(assignments, 'AssignedCoursesAndLecturers');
}

if (process.argv[2] === '--delete-courses') {
  deleteDevData('Courses');
}
if (process.argv[2] === '--delete-ongoing') {
  deleteDevData('OngoingAttendances');
}
if (process.argv[2] === '--delete-signed') {
  deleteDevData('SignedAttendances');
}
