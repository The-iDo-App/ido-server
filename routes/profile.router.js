const express = require('express');
const router = express.Router();
const { profileController } = require('../controllers');

router.route('/:userId').get(profileController.getOne);
router.route('/').get(profileController.get);

module.exports = router;
