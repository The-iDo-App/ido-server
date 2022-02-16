const express = require('express');
const router = express.Router();
const { emailController } = require('../controllers');

router.route('/otp')
    .post(emailController.post);
router.route('/change')
    .post(emailController.changePassword);

module.exports = router;