const express = require("express");
const router = express.Router();
const { evaluationController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/").post(catchErrors(evaluationController.post));

router.route("/:userId").get(catchErrors(evaluationController.getAnswers));

module.exports = router;
