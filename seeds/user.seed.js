const faker = require('faker');
const { User, Profile } = require('../models');

module.exports = async () => {
  await User.deleteMany({});
  await Profile.deleteMany({});

  for (let i = 0; i < 10; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let birthday = faker.datatype.datetime();
    let username = firstName.split(' ')[0] + birthday.toString().split(' ')[2];
    username = username.toLowerCase();
    let user = {
      username,
      firstName,
      lastName,
      mobileNumber: '09123456789',
      orientation: 'Straight (male)',
      birthday,
    };
    console.log(user);

    await Profile.create({
      userId: user._id,
      picture: {
        originalImage:
          'https://via.placeholder.com/150C/?text=' + user.username,
        blurredImage: 'https://via.placeholder.com/150C/?text=' + user.username,
      },
    });
  }
};
