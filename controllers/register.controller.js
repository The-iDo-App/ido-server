const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User, Interest } = require('../models');
const { saveImage } = require('../utils');

exports.get = async(req, res) => {
    return res.json({ 'success': 'true' });
};

exports.uploadImage = async(req, res) => {

};

exports.createUser = async(req, res) => {
    //USER PROFILE
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const birthday = new Date(req.body.birthday);
    const gender = req.body.gender;
    const orientation = req.body.orientation;
    const str = req.body.address;
    const fullAddress = new Array("", "", "", "", "");
    if (str) fullAddress = str.split(',');
    const address = {
        city: fullAddress[0],
        province: fullAddress[1],
        country: fullAddress[2],
        latitude: fullAddress[3],
        longitutde: fullAddress[4],
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
    const drink = req.body.drink;
    const smoke = req.body.smoke;
    const wantKids = req.body.wantKids;
    const sports = req.body.sports;
    const hobbies = req.body.hobbies;
    const musicGenre = req.body.musicGenre;
    const movieGenre = req.body.movieGenre;
    const pets = req.body.pets;
    const books = req.body.books;
    const food = req.body.food;


    try {
        const user = await User.create({
            firstName,
            lastName,
            username,
            birthday,
            gender,
            orientation,
            address,
            employment,
        });
        const userId = user._id;
        const userInterest = await Interest.create({
            userId,
            genderPref,
            minAge,
            maxAge,
            minDistance,
            maxDistance,
            astrologicalSign,
            religion,
            politicalView,
            drink,
            smoke,
            wantKids,
            sports,
            hobbies,
            musicGenre,
            movieGenre,
            pets,
            books,
            food,
        });

        console.log(user);
        console.log(userInterest);
    } catch (err) {
        throw err;
    }

    return res.json({ 'success': 'user created' });
}