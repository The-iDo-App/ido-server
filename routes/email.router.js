const express = require("express");
const router = express.Router();
const { emailController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/otp").post(catchErrors(emailController.post));
router.route("/change").post(catchErrors(emailController.changePassword));

module.exports = router;
