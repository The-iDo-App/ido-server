const express = require('express');
const router = express.Router();
const { evaluationController } = require('../controllers');

router.route('/')
    .post(evaluationController.post);

module.exports = router;