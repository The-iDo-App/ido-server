const express = require("express");
const router = express.Router();
const { registerController } = require("../controllers");
const multer = require("multer");
const upload = multer({ dest: "./public/apps/uploads/" });
const { catchErrors } = require("../handlers/error.handler");

router.route("/").post(catchErrors(registerController.getUser));

router.route("/createAccount").post(catchErrors(registerController.createUser));

router
  .route("/uploadImage")
  .post(upload.single("image"), catchErrors(registerController.uploadImage));

module.exports = router;
