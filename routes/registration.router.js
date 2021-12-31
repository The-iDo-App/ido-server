const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers');
const multer = require('multer');
const upload = multer({ dest: './public/apps/uploads/' });

router.route('/')
    .get(registerController.get);

router.route('/createAccount')
    .post(registerController.createUser);


router.route('/uploadImage')
    .post(upload.single('image'), registerController.uploadImage);

module.exports = router;