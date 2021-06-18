const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');



router.route('/:userId').get(loginController.getOne);

router
    .route('/')
    .get(loginController.get)
    .post(loginController.post);

module.exports = router;