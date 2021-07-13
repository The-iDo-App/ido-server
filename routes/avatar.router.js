const express = require('express');
const router = express.Router();
const { avatarController } = require('../controllers');

router.route('/')
    .get(avatarController.getAvatars);

module.exports = router;