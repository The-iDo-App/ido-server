const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');

router
    .route('/')
    .get(loginController.post)

module.exports = router;