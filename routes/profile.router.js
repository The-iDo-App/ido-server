const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "./public/apps/uploads/" });
const { jwtAuth, sameUser } = require("../middlewares");
const { profileController } = require("../controllers");
const { catchErrors } = require("../handlers/error.handler");

router.route("/users").get(catchErrors(profileController.getUsers));

router.use(jwtAuth);
router
  .route("/:userId")
  .get(catchErrors(profileController.get))
  .get(catchErrors(profileController.getOne))
  .post([sameUser, upload.single("file")], catchErrors(profileController.post))
  .put(catchErrors(profileController.put));

router.route("/").post(catchErrors(profileController.getUserInfo));

module.exports = router;
