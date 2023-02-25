-- GETTING THE ALL SIGNED ATTENDANCES FOR A SESSION
SELECT TestSignedAttendances.signedAttendanceId,TestStudents.indexNumber, TestStudents.surName,TestStudents.otherNames,TestStudents.photo, TestSignedAttendances.createdAt AS signedAt
FROM  ((TestSignedAttendances
INNER JOIN TestOngoingAttendances 
ON TestSignedAttendances.ongoingAttendanceId = TestOngoingAttendances.ongoingAttendanceId)
INNER JOIN TestStudents ON TestStudents.studentId = TestSignedAttendances.studentId ) WHERE TestOngoingAttendances.ongoingAttendanceId = 13;


-- GETTING THE ATTENDANCE SCORE OF STUDENTS FOR A PARTICULAR COURSE (IN A SEMESTER)
-- NOTE: THE TIMESTAMPS HAS TO BE BETWEEN THE REOPENING DATE OF SCHOOL AND THE CLOSING DATE OF THE SCHOOL
SELECT  0.5 * COUNT(s_attendances.signedAttendanceId )  AS Total, students.indexNumber,students.surName,students.otherNames,students.photo
FROM SignedAttendances AS s_attendances INNER JOIN Users AS students
ON s_attendances.userId = students.userId
WHERE s_attendances.courseId = 3 AND s_attendances.createdAt >= '2022-11-12 00:00:00' 
AND s_attendances.createdAt <= '2023-01-04 13:05:18'
GROUP BY students.indexNumber;

SELECT * FROM SignedAttendances;

-- AGGREGATION STRING FOR GETTING A USERS ATTENDANCE SCORE, NUMBER OF TIMES ATTENDED A LECTURE & COURSENAME IN A SEMESTER
SELECT 0.5 *COUNT(SignedAttendances.signedAttendanceId) AS Total, COUNT(SignedAttendances.signedAttendanceId)AS TimesAttended,SignedAttendances.courseId AS courseId,Courses.courseName
FROM SignedAttendances INNER JOIN Courses ON SignedAttendances.courseId = Courses.courseId WHERE SignedAttendances.createdAt>= '2022-11-12 00:00:00'
AND SignedAttendances.userId=3 AND SignedAttendances.createdAt  <= '2023-01-04 13:05:18'
GROUP BY SignedAttendances.courseId;

SELECT 0.5 *COUNT(SignedAttendances.signedAttendanceId) AS Total, COUNT(SignedAttendances.signedAttendanceId)AS TimesAttended,SignedAttendances.courseId AS courseId
FROM SignedAttendances INNER JOIN Courses ON SignedAttendances.courseId = Courses.courseId WHERE SignedAttendances.createdAt>= ?
AND SignedAttendances.userId=? AND SignedAttendances.createdAt  <= ?
GROUP BY SignedAttendances.courseId;

-- THE QUERY FOR SELECTING THE COURSES AS WELL AS THE NUMBER OF LECTURERS ASSIGNED TO THAT COURSE
SELECT Courses.courseId, Courses.courseName,COUNT(AssignedCoursesAndLecturers.userId) AS AssignedLecturers
FROM Courses LEFT JOIN  AssignedCoursesAndLecturers ON Courses.courseId = AssignedCoursesAndLecturers.courseId
WHERE Courses.departmentId=3
GROUP BY Courses.courseId;

-- THE QUERY FOR SELECTING THE ALL LECTURERS ASSIGNED TO A SPECIFIC COURSE
SELECT surName,otherNames,Users.photo,AssignedCoursesAndLecturers.assignmentId
FROM Users INNER JOIN AssignedCoursesAndLecturers ON Users.userId = AssignedCoursesAndLecturers.userId
WHERE AssignedCoursesAndLecturers.courseId = 6;

-- THE QUERY FOR SELECTING ALL PROFESSORS WHO HAVENT BEEN ASSIGNED TO A COURSE
SELECT userId,surName,otherNames,photo FROM Users WHERE userId NOT IN
(SELECT userId FROM AssignedCoursesAndLecturers WHERE courseId=9) AND departmentId=1 AND privilege IN('head_of_department','professor');

SELECT userId,surName,otherNames,departmentId FROM Users WHERE privilege IN ('head_of_department','professor');

-- QUERY FOR SELECTING THE COURSES ASSIGNED TO A PROFESSOR
SELECT Courses.courseId,Courses.courseName
FROM AssignedCoursesAndLecturers INNER JOIN Courses ON AssignedCoursesAndLecturers.courseId = Courses.courseId
WHERE AssignedCoursesAndLecturers.userId = 2;

-- QUERY STRING FOR GETTING THE INFORMATION ABOUT THE CURRENT PROFESSOR TAKING THE ATTENDANCE
SELECT * FROM QRcodes;
SELECT * FROM OngoingAttendances;
