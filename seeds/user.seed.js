const faker = require('faker');
const { User, Profile } = require('../models');
const { generateToken } = require('../utils');

module.exports = async() => {
    await User.deleteMany({});
    await Profile.deleteMany({});

    for (let i = 0; i < 10; i++) {
        let email = faker.internet.email();
        let password = faker.internet.password();
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let birthday = faker.datatype.datetime();
        let username = firstName.split(' ')[0] + birthday.toString().split(' ')[2];
        username = username.toLowerCase();
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
                latitude: 14 + Math.random(),
                longitude: 121 + Math.random(),
            },
        });

        profile = await Profile.create({
            userId: user._id,
            picture: {
                originalImage: 'https://via.placeholder.com/150C/?text=' + user.username,
                blurredImage: 'https://via.placeholder.com/150C/?text=' + user.username,
            },
            shortDescription: faker.lorem.words(),
        });

        console.log(generateToken(user));
    }
};