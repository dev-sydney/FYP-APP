CREATE TABLE TestFaculties
(
	facultyId INT NOT NULL AUTO_INCREMENT,
    facultyName VARCHAR(150) NOT NULL,
    facultyStatus BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(facultyId)
);


CREATE TABLE TestStudents
(
	studentId INT NOT NULL AUTO_INCREMENT,
    surName VARCHAR(50) NOT NULL,
    otherNames VARCHAR(150) NOT NULL,
    indexNumber INT NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    userPassword VARCHAR(250) NOT NULL,
    passwordConfirm VARCHAR(250),
    facultyId INT NOT NULL,
    photo VARCHAR(100) DEFAULT 'default.jpg',
    studentStatus BOOLEAN DEFAULT TRUE,
    secretQuestions JSON ,
    secretAnswers JSON ,
    UNIQUE(indexNumber),
    FOREIGN KEY (facultyId) REFERENCES TestFaculties (facultyId) ON UPDATE CASCADE,
    PRIMARY KEY(studentId)
);
SELECT * FROM TestStudents;

CREATE TABLE TestProfessors
(
	professorId INT NOT NULL AUTO_INCREMENT,
    surName VARCHAR(50) NOT NULL,
    otherNames VARCHAR(150) NOT NULL ,
    emailAddress VARCHAR(250) NOT NULL,
    userPassword VARCHAR(250) NOT NULL,
    passwordConfirm VARCHAR(250),
    facultyId INT NOT NULL,
	photo VARCHAR(100) DEFAULT 'default.jpg',
    isAllowedToTakeAttendance BOOLEAN DEFAULT TRUE,
	professorStatus BOOLEAN DEFAULT TRUE,
    UNIQUE(emailAddress),
    FOREIGN KEY (facultyId) REFERENCES TestFaculties (facultyId),
	PRIMARY KEY(professorId)
    
);
SELECT * FROM TestProfessors;
CREATE TABLE TestOngoingAttendances
(
	ongoingAttendanceId INT NOT NULL UNIQUE AUTO_INCREMENT,
    professorId INT NOT NULL,
    courseId INT NOT NULL,
    lectureRoom VARCHAR(20) NOT NULL,
    createdAt TIMESTAMP,
    endsAt TIMESTAMP,
    QRcodeId INT,
    FOREIGN KEY (QRcodeId) REFERENCES TestQRcodes (QRcodeId),
    PRIMARY KEY(ongoingAttendanceId)
);
SELECT * FROM TestOngoingAttendances;
desc TestOngoingAttendances;
ALTER TABLE TestOngoingAttendances ADD COLUMN QRcodeId INT;
ALTER TABLE TestOngoingAttendances ADD FOREIGN KEY (QRcodeId) REFERENCES TestQRcodes(QRcodeId);

SET TIME_ZONE = '+00:00';
CREATE TABLE TestQRcodes
(
	QRcodeId INT NOT NULL AUTO_INCREMENT,
    lectureRoom VARCHAR(20) NOT NULL,
    lockStatus BOOLEAN DEFAULT FALSE,
    ongoingAttendanceId INT,
    FOREIGN KEY (ongoingAttendanceId) REFERENCES TestOngoingAttendances(ongoingAttendanceId),
    PRIMARY KEY(QRcodeId)
);
SELECT * FROM TestQRcodes;

CREATE TABLE TestSignedAttendances
(
	signedAttendanceId INT NOT NULL UNIQUE AUTO_INCREMENT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    courseId INT,
    studentId INT NOT NULL,
    ongoingAttendanceId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES TestStudents(studentId),
    FOREIGN KEY (ongoingAttendanceId) REFERENCES TestOngoingAttendances(ongoingAttendanceId),
    PRIMARY KEY (signedAttendanceId)
);

CREATE TABLE SecurityQs
(
	questionID INT NOT NULL AUTO_INCREMENT,
    question VARCHAR(200) UNIQUE,
    PRIMARY KEY(questionID)
);

CREATE TABLE ExampleTime
(
 _id INT NOT NULL AUTO_INCREMENT,
 createdAt TIMESTAMP,
 PRIMARY KEY(_id)
);
INSERT INTO ExampleTime(createdAt) VALUES('2022-11-17 15:56:42.226');
DROP TABLE ExampleTime;

ALTER TABLE TestQRcodes ADD COLUMN url VARCHAR(250);
ALTER TABLE TestQRcodes DROP COLUMN url;

ALTER TABLE TestStudents ADD COLUMN resetPasswordToken VARCHAR(250);
ALTER TABLE TestProfessors ADD COLUMN resetPasswordToken VARCHAR(250);

ALTER TABLE TestStudents ADD COLUMN passwordResetExpires TIMESTAMP;
ALTER TABLE TestProfessors ADD COLUMN passwordResetExpires TIMESTAMP;



