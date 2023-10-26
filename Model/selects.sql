SELECT * FROM Courses WHERE departmentId=3;
SELECT * FROM Courses;
SELECT * FROM Courses WHERE courseId=34;


SELECT * FROM AssignedCoursesAndLecturers;

SELECT * FROM SecurityQuestionsAnswers;

SELECT * FROM Users;
SELECT * FROM Users WHERE privilege IN ('head_of_department','professor');
SELECT * FROM Users WHERE privilege = 'professor';
SELECT * FROM Users WHERE privilege = 'student';

SELECT * FROM Users WHERE privilege = 'admin';

SELECT * FROM Users WHERE userId =27;
SELECT * FROM Users WHERE privilege = 'student' AND hasSecurityQuestionsSet = FALSE;
DESC Users;

SELECT Courses.courseId,Courses.courseName
  FROM AssignedCoursesAndLecturers INNER JOIN Courses ON AssignedCoursesAndLecturers.courseId = Courses.courseId
  WHERE AssignedCoursesAndLecturers.userId = 14;
  
SELECT * FROM  AssignedCoursesAndLecturers;

SELECT * FROM QRcodes;

SELECT * FROM OngoingAttendances ;

SELECT * FROM SignedAttendances WHERE signedAttendanceId >= 16;
SELECT * FROM SignedAttendances;

SELECT * FROM Faculties;

SELECT * FROM Departments;

SELECT * FROM TestTimes;
SELECT * FROM TestTimes WHERE createdAt <= '2023-02-27 15:00:22.013';

SELECT * FROM SecurityQs;