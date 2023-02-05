const express = require('express');

const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController');

const router = express.Router();
//CREATE
router.use(authController.authenticateUser);
router.use(
  authController.restrictTo('admin', 'head_of_department', 'professor')
);
router
  .route('/')
  .post(courseController.createCourse)
  .get(courseController.getCourses);

router
  .route('/assignedCourses')
  .get(courseController.getCoursesAndAssignedLecturers);
//READ & UPDATE & DELETE
router
  .route('/:courseId')
  .get(courseController.getSendCourse)
  .patch(courseController.updateCourse)
  .delete(authController.restrictTo('admin'), courseController.deleteCourse);

module.exports = router;
