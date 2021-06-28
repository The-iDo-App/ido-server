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
    const sex = req.body.sex;
    const orientation = req.body.orientation;
    const fullAddress = req.body.address.split(',');
    // const fullAddress = new Array("", "", "", "", "");
    const address = {
        postalCode: fullAddress[0],
        city: fullAddress[1],
        province: fullAddress[2],
        country: fullAddress[3],
        latitude: fullAddress[4],
        longitutde: fullAddress[5],
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
    // const wantMarried = req.body.wantMarried;
    const sports = req.body.sports.split(',');
    const hobbies = req.body.hobbies.split(',');
    const musicGenre = req.body.musicGenre.split(',');
    const movieGenre = req.body.movieGenre.split(',');
    const pets = req.body.pets.split(',');
    const books = req.body.books.split(',');
    const food = req.body.food.split(',');

    try {
        const user = await User.create({
            firstName,
            lastName,
            username,
            birthday,
            sex,
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
            wantMarried,
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

    return res.json({ 'user_id': userId });
}