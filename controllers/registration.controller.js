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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const birthday = new Date(req.body.birthday);
    const sex = req.body.sex;
    const orientation = req.body.orientation;
    const fullAddress = req.body.address.split(',');
    const address = {
        postalCode: fullAddress[0],
        city: fullAddress[1],
        province: fullAddress[2],
        country: fullAddress[3],
        latitude: fullAddress[4],
        longitude: fullAddress[5],
    };
    const employment = req.body.employment;

    //INTEREST PREFERENCE
    const genderPref = req.body.genderPref;
    const minAge = req.body.minAge;
    const maxAge = req.body.maxAge;
    const minDistance = req.body.minDistance;
    const maxDistance = req.body.maxDistance;
    const astrologicalSign = req.body.astrologicalSign;
    const religion = req.body.religion;
    const politicalView = req.body.politicalView;
    const smoke = req.body.smoke;
    const wantKids = req.body.wantKids;
    const wantMarried = req.body.wantMarried;
    const sportsLength = req.body.sports.split(',').length - 1;
    const sports = req.body.sports.split(',', sportsLength);
    const hobbiesLength = req.body.hobbies.split(',').length - 1;
    const hobbies = req.body.hobbies.split(',', hobbiesLength);
    const musicGenreLength = req.body.musicGenre.split(',').length - 1;
    const musicGenre = req.body.musicGenre.split(',', musicGenreLength);
    const movieGenreLength = req.body.movieGenre.split(',').length - 1;
    const movieGenre = req.body.movieGenre.split(',', movieGenreLength);
    const petsLength = req.body.pets.split(',').length - 1;
    const pets = req.body.pets.split(',', petsLength);
    const booksLength = req.body.books.split(',').length - 1;
    const books = req.body.books.split(',', booksLength);
    const foodLength = req.body.food.split(',').length - 1;
    const food = req.body.food.split(',', foodLength);
    const drinksLength = req.body.drinks.split(',').length - 1;
    const drinks = req.body.drinks.split(',', drinksLength);
    let userId;
    let user;
    try {
        user = await User.create({
            firstName,
            lastName,
            username,
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