const express = require('express');
const router = express.Router();
const { evaluationController } = require('../controllers');

router.route('/')
    .post(evaluationController.post);

router.route('/:userId')
    .get(evaluationController.getAnswers)


module.exports = router;