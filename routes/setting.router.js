const express = require('express');
const { settingController } = require('../controllers');
const { jwtAuth } = require('../middlewares');
const router = express.Router();

router
  .route('/account-deletion')
  .post([jwtAuth], settingController.accountDeletion);

router
  .route('/personal-information')
  .get([jwtAuth], settingController.personalInformation);

router
  .route('/leave-conversation')
  .post([jwtAuth], settingController.leaveConversation);

router.route('/report-user').post([jwtAuth], settingController.reportUser);

router
  .use(jwtAuth)
  .route('/blocked-users')
  .get(settingController.getBlockedUsers)
  .delete(settingController.unblockUser)
  .post(settingController.blockUser);

module.exports = router;
