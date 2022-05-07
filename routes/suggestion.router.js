const express = require("express");
const { suggestionController } = require("../controllers");
const { jwtAuth } = require("../middlewares");
const router = express.Router();
const { catchErrors } = require("../handlers/error.handler");

router.route("/").get([jwtAuth], catchErrors(suggestionController.get));
router
  .route("/:userId")
  .post([jwtAuth], catchErrors(suggestionController.post));

module.exports = router;
