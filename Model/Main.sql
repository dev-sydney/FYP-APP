CREATE DATABASE ClassAttendanceSystem;
USE ClassAttendanceSystem;
SHOW TABLES;
DESC TestOngoingAttendances;

-- GETTING THE ALL SIGNED ATTENDANCES FOR A SESSION
SELECT TestSignedAttendances.signedAttendanceId,TestStudents.indexNumber, TestStudents.surName,TestStudents.otherNames,TestStudents.photo, TestSignedAttendances.createdAt AS signedAt
FROM  ((TestSignedAttendances
INNER JOIN TestOngoingAttendances 
ON TestSignedAttendances.ongoingAttendanceId = TestOngoingAttendances.ongoingAttendanceId)
INNER JOIN TestStudents ON TestStudents.studentId = TestSignedAttendances.studentId ) WHERE TestOngoingAttendances.ongoingAttendanceId = 13;


-- GETTING THE ATTENDANCE SCORE OF STUDENTS FOR A PARTICULAR COURSE (IN A SEMESTER)
-- NOTE: THE TIMESTAMPS HAS TO BE BETWEEN THE REOPENING DATE OF SCHOOL AND THE CLOSING DATE OF THE SCHOOL
SELECT  0.5 / COUNT(s_attendances.signedAttendanceId )  AS Total, students.indexNumber,students.surName,students.otherNames,students.photo
FROM SignedAttendances AS s_attendances INNER JOIN Users AS students
ON s_attendances.userId = students.userId
WHERE courseId = 6 AND s_attendances.createdAt >= '2022-11-12 00:00:00' 
AND s_attendances.createdAt <= '2022-11-12 23:31:59'
GROUP BY students.indexNumber;

SELECT * FROM SignedAttendances;

SELECT  0.5 / COUNT(SignedAttendances.signedAttendanceId )  AS Total, students.indexNumber,students.surName,students.otherNames,students.photo
FROM TestSignedAttendances AS SignedAttendances INNER JOIN TestStudents AS students
ON SignedAttendances.studentId = students.studentId
WHERE courseId = 6 AND SignedAttendances.createdAt >= 'startDate' 
AND SignedAttendances.createdAt <= 'endDate'
GROUP BY students.indexNumber;


SELECT studentId,otherNames,surName FROM TestStudents;
SELECT * FROM Courses;
SELECT * FROM TestSignedAttendances;