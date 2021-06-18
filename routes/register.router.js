const express = require('express');
const router = express.Router();
const { registrationController } = require('../controllers');

router
    .route('/')
    .get(registrationController.get)
    .post(registrationController.post);

module.exports = router;