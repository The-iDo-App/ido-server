const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: './public/apps/uploads/' });
const { profileController } = require('../controllers');

router
  .route('/:userId')
  .get(profileController.getOne)
  .post([upload.single('file')], profileController.post);
router.route('/').get(profileController.get);

module.exports = router;
