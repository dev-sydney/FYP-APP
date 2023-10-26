//----3RD PARTY MODULES----//
const express = require('express');

//----OWN MODULES----//
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signupStudent);

router.route('/login').post(authController.login);

router.route('/signout').get(authController.signoutUser);

router.route('/forgot-password').post(authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.authenticateUser);

router.post(
  '/',
  authController.restrictTo('professor', 'admin'),
  userController.getUser
);

router.patch('/update-password', authController.updatePassword);

router
  .route('/security-questions')
  .get(
    authController.restrictTo('student'),
    authController.getSecurityQuestions
  )
  .post(authController.restrictTo('student'), authController.createUsersQnAs);

router.patch(
  '/update-me',
  userController.uploadUserPhoto,
  userController.updateUser
);

router
  .route('/assignedProfessors/:courseId')
  .get(
    authController.restrictTo('head_of_department', 'admin'),
    userController.getProfessorsAssignedToCourse
  );

router
  .route('/professors/')
  .get(
    authController.restrictTo('head_of_department', 'admin'),
    userController.getAllProfessors
  )
  .post(
    authController.restrictTo('admin', 'head_of_department'),
    userController.addNewProfessor
  )
  .patch(
    authController.restrictTo('head_of_department'),
    userController.assignCourseToProfessor
  );
// .delete(
//   authController.restrictTo('head_of_department'),
//   userController.deAllocateAssignedCourse
// );

router
  .route('/unassignedProfessors/:courseId')
  .get(
    authController.restrictTo('head_of_department'),
    userController.getUnassignedProfessors
  );

router
  .route('/professors/:userId')
  .delete(
    authController.restrictTo('head_of_department', 'admin'),
    userController.deleteUser
  );
router
  .route('/assignedProfessors/:assignmentId')
  .delete(
    authController.restrictTo('head_of_department'),
    userController.deAllocateAssignedCourse
  );
module.exports = router;
