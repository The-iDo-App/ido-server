const { User } = require('../models');

module.exports = async () => {
  await User.create({
    username: 'marx',
    firstName: 'Marx Chryz',
    lastName: 'Del Mundo',
    mobileNumber: '09123456789',
    orientation: 'Straight (male)',
    birthday: new Date('08/30/2000'),
  });
};
