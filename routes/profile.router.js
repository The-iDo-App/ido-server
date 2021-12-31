const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: './public/apps/uploads/' });
const { jwtAuth, sameUser } = require('../middlewares');
const { profileController } = require('../controllers');

router.use(jwtAuth);
router
    .route('/:userId')
    .get(profileController.getOne)
    .post([sameUser, upload.single('file')], profileController.post);
router.route('/').get(profileController.get);

module.exports = router;