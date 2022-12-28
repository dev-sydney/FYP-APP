const express = require('express');
const facultyController = require('./../controllers/facultyController');

const router = express.Router();

//CREATE
router
  .route('/')
  .post(facultyController.createFaculty)
  .get(facultyController.getAllFaculties);

//READ

//UPDATE

//DELETE
router.route('/:facultyId').delete(facultyController.deleteFaculty);
module.exports = router;
