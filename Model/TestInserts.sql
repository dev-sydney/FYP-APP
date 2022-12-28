INSERT INTO TestFaculties(facultyName) VALUES('Accounting and Finance');
INSERT INTO TestFaculties(facultyName) VALUES('Management Studies');
INSERT INTO TestFaculties(facultyName) VALUES('I.T. & Communication Studies');
INSERT INTO TestFaculties(facultyName) VALUES('Office of Doctoral Programmes');

INSERT INTO ExampleTime(createdAt) VALUES('2022-5-11 09:37:46.059');

-- STUDENTS INSERTS
INSERT INTO TestStudents 
(surName,otherNames,indexNumber,emailAddress,userPassword,facultyId,secretQuestions,secretAnswers) 
VALUES 
(
'jane',
'doe',
1011300,
'janedoe@example.com',
'test1234',
2,
'[1, 3, 5]',
'["morning", "noon", "night"]'
);

INSERT INTO SecurityQuestionsAnswers (securityQuestions,securityAnswers,userId)
VALUES
(
'["QUESTION 1", "QUESTION 2", "QUESTION 3"]',
'["morning", "noon", "night"]',
1
);

SELECT * FROM SecurityQuestionsAnswers;

INSERT INTO TestStudents
(surName,otherNames,indexNumber,emailAddress,userPassword,facultyId,secretQuestions,secretAnswers)
VALUES
(
"Sarah",
"park",
10101056,
"sarahpark@example.com",
"test1234",
2,
 '[\"What city or town were you in on New Year\'s 2000?\"]'
);


SELECT * FROM TestStudents;
SELECT * FROM TestOngoingAttendances;
SELECT * FROM TestQRcodes;
SELECT * FROM TestProfessors;
SELECT * FROM Courses;

DELETE FROM TestStudents WHERE indexNumber=10101056;