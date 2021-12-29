const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User, Interest } = require('../models');
const { generateToken } = require('../utils');

exports.get = async(req, res) => {
    return res.json({ 'success': 'true' });
};

exports.createUser = async(req, res) => {
    //USER PROFILE
    const { firstName, lastName, username, email, password, sex, orientation, employment } = req.body;
    const birthday = new Date(req.body.birthday);
    const fullAddress = req.body.address.split(',');
    const address = {
        postalCode: fullAddress[0],
        city: fullAddress[1],
        province: fullAddress[2],
        country: fullAddress[3],
        latitude: fullAddress[4],
        longitude: fullAddress[5],
    };

    //INTEREST PREFERENCE
    const {
        genderPref,
        minAge,
        maxAge,
        minDistance,
        maxDistance,
        astrologicalSign,
        religion,
        politicalView,
        smoke,
        wantKids,
        wantMarried
    } = req.body;
    const sports = req.body.sports.split(',');
    const hobbies = req.body.hobbies.split(',');
    const musicGenre = req.body.musicGenre.split(',');
    const movieGenre = req.body.movieGenre.split(',');
    const pets = req.body.pets.split(',');
    const books = req.body.books.split(',');
    const food = req.body.food.split(',');
    const drinks = req.body.drinks.split(',');
    let userId;
    let user;
    try {
        user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password,
            birthday,
            sex,
            orientation,
            address,
            employment,
        });
        userId = user._id;

        let userInterest = await Interest.create({
            userId,
            genderPref,
            minAge,
            maxAge,
            minDistance,
            maxDistance,
            astrologicalSign,
            religion,
            politicalView,
            smoke,
            wantKids,
            wantMarried,
            sports,
            hobbies,
            musicGenre,
            movieGenre,
            pets,
            books,
            food,
            drinks,
        });
    } catch (err) {
        throw err;
    }
    var access_token = generateToken(user);
    console.log(access_token);
    return res.json({ 'user_id': userId, 'access_token': access_token });
}
