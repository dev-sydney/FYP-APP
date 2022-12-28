const express = require('express');

const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController');

const router = express.Router();
//CREATE
router.use(authController.authenticateUser);
router.use(authController.restrictTo('admin', 'head_of_department'));
router
  .route('/')
  .post(courseController.createCourse)
  .get(courseController.getCourses);
//READ & UPDATE
router
  .route('/:courseId')
  .get(courseController.getSendCourse)
  .patch(courseController.updateCourse);

//DELETE
module.exports = router;
