const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers');

router.route('/')
    .get(registerController.get);

router.route('/createAccount')
    .post(registerController.createUser);

module.exports = router;