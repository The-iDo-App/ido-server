const express = require("express");
const router = express.Router();
const { questionController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/").get(catchErrors(questionController.get));

module.exports = router;
