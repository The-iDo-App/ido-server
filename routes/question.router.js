const express = require('express');
const router = express.Router();
const { questionController } = require('../controllers');

router.route('/')
    .get(questionController.get);

module.exports = router;