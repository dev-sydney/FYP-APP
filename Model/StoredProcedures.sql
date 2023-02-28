-- CREATE PROCEDURE `new_procedure` (IN currentTime TIMESTAMP)
-- BEGIN
-- UPDATE QRcodes SET lectureRoom = null, ongoingAttendanceId = null, professorId= null, isLocked=TRUE WHERE expiresAt <= currentTime;
-- END
CALL new_procedure('2023-02-27 15:30:58.426');
CALL lockLectureHallQRcodes('');