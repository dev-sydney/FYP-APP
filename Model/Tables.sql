CREATE TABLE Titles
(
	titleId INT NOT NULL AUTO_INCREMENT,
    titleName ENUM('MR','MRS','MS') NOT NULL ,
    titleStatus BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (titleId)
);

CREATE TABLE Courses
(
	courseId INT NOT NULL AUTO_INCREMENT,
    courseName VARCHAR(100) NOT NULL,
    courseCode VARCHAR(10) NOT NULL,
    facultyId INT NOT NULL,
    PRIMARY KEY (courseId),
    FOREIGN KEY (facultyId) REFERENCES Faculties(facultyId)
);

DESC Courses;

CREATE TABLE Faculties
(
	facultyId INT NOT NULL AUTO_INCREMENT,
    facultyName VARCHAR(150) NOT NULL,
    facultyStatus BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(facultyId)
);
DESC Faculties;

CREATE TABLE Professors
(
	professorId INT NOT NULL AUTO_INCREMENT,
    surName VARCHAR(50) NOT NULL,
    otherNames VARCHAR(150) NOT NULL ,
    title INT NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    userPassword VARCHAR(250) NOT NULL,
    passwordConfirm VARCHAR(250) NOT NULL,
    facultyId INT NOT NULL,
	photo VARCHAR(100) DEFAULT 'default.jpg',
    isAllowedToTakeAttendance BOOLEAN DEFAULT TRUE,
	professorStatus BOOLEAN DEFAULT TRUE,
    privilege VARCHAR(20) DEFAULT 'professor',
    UNIQUE(professorEmailAdress),
    FOREIGN KEY (facultyId) REFERENCES Faculties (facultyId),
    FOREIGN KEY (title) REFERENCES Titles (titleId),
	PRIMARY KEY(professorId)
    
);

CREATE TABLE Students
(
	studentId INT NOT NULL AUTO_INCREMENT,
    surName VARCHAR(50) NOT NULL,
    otherNames VARCHAR(150) NOT NULL,
    indexNumber INT NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    userPassword VARCHAR(250) NOT NULL,
    passwordConfirm VARCHAR(250) NOT NULL,
    facultyId INT NOT NULL,
    photo VARCHAR(100) DEFAULT 'default.jpg',
    studentStatus BOOLEAN DEFAULT TRUE,
    secretQuestions JSON ,
    secretAnswers JSON ,
    UNIQUE(indexNumber),
    FOREIGN KEY (facultyId) REFERENCES Faculties (facultyId) ON UPDATE CASCADE,
    PRIMARY KEY(studentId)
);

CREATE TABLE Users
(
	userId INT NOT NULL AUTO_INCREMENT,
    surName VARCHAR(50) NOT NULL,
	otherNames VARCHAR(150) NOT NULL,
	indexNumber INT,
    emailAddress VARCHAR(250) NOT NULL,
    userPassword VARCHAR(250) NOT NULL,
    passwordConfirm VARCHAR(250),
    facultyId INT NOT NULL,
    photo VARCHAR(250) DEFAULT 'default.jpg',
    userStatus BOOLEAN DEFAULT TRUE,
    privilege ENUM('student','professor','admin') NOT NULL DEFAULT 'student',
    UNIQUE(indexNumber,emailAddress),
    FOREIGN KEY (facultyId) REFERENCES Faculties (facultyId) ON UPDATE CASCADE,
    PRIMARY KEY(userId)
);

SELECT * FROM Users;
ALTER TABLE Users ADD COLUMN hasSecurityQuestionsSet BOOLEAN DEFAULT FALSE;
CREATE TABLE SecurityQuestionsAnswers
(
	securityQA_id INT auto_increment,
    securityQuestions JSON NOT NULL,
    securityAnswers JSON NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON UPDATE CASCADE,
    PRIMARY KEY (securityQA_id)
);
SELECT * FROM QRcodes;
SELECT * FROM SecurityQuestionsAnswers ;
CREATE TABLE OngoingAttendances
(
	ongoingAttendanceId INT NOT NULL UNIQUE AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    lectureRoom VARCHAR(20) NOT NULL,
    createdAt TIMESTAMP,
    endsAt TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (courseId) REFERENCES Courses (courseId),
    PRIMARY KEY(ongoingAttendanceId)
);
SELECT * FROM OngoingAttendances;
DESC TestOngoingAttendances;
ALTER TABLE OngoingAttendances ADD FOREIGN KEY (QRcodeId) REFERENCES QRcodes(QRcodeId); 
CREATE TABLE SignedAttendances
(
	signedAttendanceId INT NOT NULL UNIQUE AUTO_INCREMENT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    courseId INT NOT NULL,
    userId INT NOT NULL,
    ongoingAttendanceId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (courseId) REFERENCES Courses(courseId),
    FOREIGN KEY (ongoingAttendanceId) REFERENCES OngoingAttendances(ongoingAttendanceId),
    PRIMARY KEY (signedAttendanceId)
);
SELECT * FROM SignedAttendances;
SELECT * FROM OngoingAttendances;
CREATE TABLE QRcodes
(
	QRcodeId INT NOT NULL AUTO_INCREMENT,
    lectureRoom VARCHAR(20) NOT NULL,
    isLocked BOOLEAN DEFAULT TRUE,
    ongoingAttendanceId INT,
    FOREIGN KEY (ongoingAttendanceId) REFERENCES OngoingAttendances(ongoingAttendanceId),
    PRIMARY KEY(QRcodeId)
);

SELECT * FROM QRcodes;
SELECT * FROM Users;
ALTER TABLE QRcodes ADD COLUMN professorId INT;

DESC TestQRcodes;
CREATE INDEX idx_ongoingAttendance
ON QRcodes (ongoingAttendanceId);

