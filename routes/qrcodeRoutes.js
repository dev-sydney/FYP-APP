const express = require('express');

const QRcodeController = require('./../controllers/QRcodeController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.authenticateUser);

router
  .route('/')
  .post(QRcodeController.generateQRcode)
  .get(QRcodeController.getAllQRcodes);

router
  .route('/:QRcodeId')
  .delete(authController.restrictTo('admin'), QRcodeController.deleteQRCode);

module.exports = router;
