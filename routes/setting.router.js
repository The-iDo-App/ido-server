const express = require("express");
const { settingController } = require("../controllers");
const { jwtAuth } = require("../middlewares");
const router = express.Router();
const { catchErrors } = require("../handlers/error.handler");

router
  .route("/account-deletion")
  .post([jwtAuth], catchErrors(settingController.accountDeletion));

router
  .route("/personal-information")
  .get([jwtAuth], catchErrors(settingController.personalInformation));

router
  .route("/leave-conversation")
  .post([jwtAuth], catchErrors(settingController.leaveConversation));

router
  .route("/report-user")
  .post([jwtAuth], catchErrors(settingController.reportUser));

router
  .route("/change-password")
  .put([jwtAuth], settingController.changePassword);

router
  .use(jwtAuth)
  .route("/blocked-users")
  .get(settingController.getBlockedUsers)
  .delete(settingController.unblockUser)
  .post(settingController.blockUser);

module.exports = router;
