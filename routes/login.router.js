const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers');


router.route('/')
    .get(loginController.get)
    .post(loginController.post);

router.route('/gmail/:gmail')
    .get(loginController.getGmail);

router.route('/facebook/:fbId')
    .get(loginController.getFacebook);


module.exports = router;