const express = require("express");
const router = express.Router();
const { avatarController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/").get(catchErrors(avatarController.getAvatars));

module.exports = router;
