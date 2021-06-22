const express = require('express');
const { settingController } = require('../controllers');

router.route('/account-deletion').post(settingController.accountDeletion);

router
  .route('/personal-information')
  .get(settingController.personalInformation);

router
  .route('/blocked-users')
  .get(settingController.getBlockedUsers)
  .post(settingController.unblockUsers);

module.exports = router;
