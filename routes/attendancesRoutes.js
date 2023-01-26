const express = require('express');

const attendanceController = require('./../controllers/attendanceController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.authenticateUser);
/**
 * Starts an ongoing attendance
 */
router
  .route('/ongoing/')
  .post(
    authController.restrictTo('professor', 'head_of_department'),
    attendanceController.createOngoingAttendance
  )
  .get(
    authController.restrictTo('professor', 'head_of_department'),
    attendanceController.getAttendancesStartedByProfessor
  );

router
  .route('/ongoing/:ongoingAttendanceId')
  .patch(
    authController.restrictTo('professor'),
    attendanceController.endOngoingAttendance
  );

//NOTE: THIS ROUTE IS TO CHECK THE PROFESSOR USING A PARTICULAR QRCODE BEFORE GETTING THEIR RANDOM SECURITY QUESTION
router
  .route('/getCurrentProfessor/:QRcodeId')
  .get(
    authController.restrictTo('student'),
    attendanceController.getCurrentProfessor
  );

//TODO: IMPLEMENT RATE-LIMITING ON THIS ROUTE
//NOTE: ROUTE FOR VALIDATING SOON TO BE SIGNED ATTENDANCE BY SENDING A SECURITY QUESTION
router
  .route('/validate-attendance/:QRcodeId')
  .get(
    authController.restrictTo('student'),
    attendanceController.checkSignedAttendanceValidility
  );

//NOTE:ROUTE FOR CREATING A SIGNED ATTENDANCE AFTER VALIDATION
router
  .route('/sign-attendance/:ongoingAttendanceId/:courseId/:randomIndex')
  .post(
    authController.restrictTo('student'),
    attendanceController.createSignedAttendance
  );

//NOTE: THIS IS THE ROUTE FOR GETTING ALL THE SIGNED ATTENDANCES FOR A SESSION
router
  .route('/signed-attendances/:ongoingAttendanceId')
  .get(attendanceController.getSignedAttendances);

//NOTE: THIS ROUTE GETS THE SCORES OF STUDENTS IN A SEMESTER
router
  .route('/semester-attendance-scores/:courseId')
  .post(
    authController.restrictTo('head_of_department', 'professor'),
    attendanceController.getSemesterAttendanceScores
  );

router
  .route('/manual-attendance-sign/:userId/:courseId/:ongoingAttendanceId')
  .post(
    authController.restrictTo('professor'),
    attendanceController.createSignedAttendanceManually
  );
module.exports = router;
