const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/otp").post(catchErrors(loginController.getEmail));

router.route("/").post(catchErrors(loginController.post));

router.route("/gmail/:gmail").get(catchErrors(loginController.getGmail));

router.route("/facebook/:fbId").get(catchErrors(loginController.getFacebook));

module.exports = router;
