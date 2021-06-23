const express = require('express');
const { suggestionController } = require('../controllers');
const { jwtAuth } = require('../middlewares');
const router = express.Router();

router.route('/').get([jwtAuth], suggestionController.get);

module.exports = router;
