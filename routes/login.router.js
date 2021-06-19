const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');


router.route('/g').get(loginController.getCode);
router.route('/g/googleauth').get(loginController.googleSign);

router
    .route('/')
    .post(loginController.post);

module.exports = router;