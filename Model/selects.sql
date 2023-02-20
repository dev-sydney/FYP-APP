SELECT * FROM Courses WHERE departmentId=5;
SELECT * FROM Courses;
SELECT * FROM Courses WHERE courseId=25;


SELECT * FROM AssignedCoursesAndLecturers;

SELECT * FROM SecurityQuestionsAnswers;

SELECT * FROM Users;
SELECT * FROM Users WHERE privilege IN ('student') AND departmentId =3;
SELECT * FROM Users WHERE userId =27;

SELECT * FROM QRcodes;

SELECT * FROM OngoingAttendances WHERE ongoingAttendanceId >= 24;

SELECT * FROM SignedAttendances;

SELECT * FROM Faculties;

SELECT * FROM Departments;
