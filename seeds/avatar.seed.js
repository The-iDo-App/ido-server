const { Avatar } = require('../models');

module.exports = async () => {
  let avatars = [];
  for (let i = 154; i < 204; i++) {
    avatars.push({
      picture:
        process.env.APPS_SUBDOMAIN + '/images/avatars/' + 'Asset ' + i + '.png',
    });
  }

  await Avatar.insertMany(avatars);
};
