const express = require('express');

const QRcodeController = require('./../controllers/QRcodeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').post(QRcodeController.generateQRcode);

module.exports = router;
