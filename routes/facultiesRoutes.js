const express = require('express');
const facultyController = require('./../controllers/facultyController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.authenticateUser);
//CREATE
router
  .route('/')
  .post(authController.restrictTo('admin'), facultyController.createFaculty)
  .get(
    authController.restrictTo('professor', 'head_of_department'),
    facultyController.getAllFaculties
  );

//READ

//UPDATE

//DELETE
router.route('/:facultyId').delete(facultyController.deleteFaculty);
module.exports = router;
