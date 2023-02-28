SELECT * FROM Courses WHERE departmentId=3;
SELECT * FROM Courses;
SELECT * FROM Courses WHERE courseId=34;


SELECT * FROM AssignedCoursesAndLecturers;

SELECT * FROM SecurityQuestionsAnswers;

SELECT * FROM Users;
SELECT * FROM Users WHERE privilege IN ('head_of_department','professor');
SELECT * FROM Users WHERE privilege = 'student';
SELECT * FROM Users WHERE userId =27;

SELECT * FROM QRcodes;

SELECT * FROM OngoingAttendances WHERE ongoingAttendanceId >= 24;

SELECT * FROM SignedAttendances WHERE signedAttendanceId >= 16;

SELECT * FROM Faculties;

SELECT * FROM Departments;

SELECT * FROM TestTimes;
SELECT * FROM TestTimes WHERE createdAt <= '2023-02-27 15:00:22.013';
