const faker = require('faker');
const { User, Profile } = require('../models');
const { generateToken } = require('../utils');

const random = (arr, min = 1, max = 1) => {
  arr = arr.slice(0);
  let chosen = [];
  let n = Math.floor(Math.random() * (max + 1 - min)) + min;
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * arr.length);
    chosen.push(arr[index]);
    arr.splice(index, 1);
  }
  if (min === max && min === 1) {
    return chosen[0];
  }
  return chosen;
};

module.exports = async (max) => {
  await User.deleteMany({});
  await Profile.deleteMany({});

  for (let i = 0; i < max; i++) {
    let isLastIteration = i + 1 === max;
    let email = isLastIteration
      ? 'marxchryz@gmail.com'
      : faker.internet.email();
    let password = isLastIteration ? 'marx12345' : faker.internet.password();
    let firstName = isLastIteration ? 'Marx Chryz' : faker.name.firstName();
    let lastName = isLastIteration ? 'Del Mundo' : faker.name.lastName();
    let birthday = faker.datatype.datetime({
      max: new Date('February 21, 2004').getTime(),
      min: new Date('February 21, 1992').getTime(),
    });
    let username = isLastIteration ? 'Marx' : firstName.split(' ')[0]; //+ birthday.toString().split(' ')[2];
    // username = username.toLowerCase();
    let user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password,
      mobileNumber: '09123456789',
      orientation: 'Straight (male)',
      birthday,
      address: {
        city: 'Some City',
        latitude: 14 + Math.random() / 10,
        longitude: 121 + Math.random() / 10,
      },
      sex: random(['man', 'woman']),
    });

    profile = await Profile.create({
      userId: user._id,
      picture: {
        originalImage:
          'https://via.placeholder.com/150C/?text=' + user.username,
        blurredImage: 'https://via.placeholder.com/150C/?text=' + user.username,
      },
      shortDescription: faker.lorem.words(),
    });

    console.log(generateToken(user));
  }
};
