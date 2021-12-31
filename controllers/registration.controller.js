const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User, Interest } = require('../models');
const { generateToken, saveImage } = require('../utils');

exports.get = async(req, res) => {
    return res.json({ 'success': 'true' });
};

exports.createUser = async(req, res) => {
    //USER PROFILE
    const { firstName, lastName, username, email, password, sex, orientation, employment, address } = req.body;
    const birthday = new Date(req.body.birthday);
    //INTEREST PREFERENCE
    const minDistance = 0;
    const {
        genderPref,
        minAge,
        maxAge,
        maxDistance,
        astrologicalSign,
        religion,
        politicalView,
        smoke,
        wantKids,
        wantMarried
    } = req.body;

    //MULTI SELECT PREF
    const {
        sports,
        hobbies,
        musicGenre,
        movieGenre,
        pets,
        books,
        food,
        drinks
    } = req.body;

    let userId;
    let interestId;
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
        interestId = userInterest._id;
    } catch (err) {
        throw err;
    }
    var access_token = generateToken(user);
    return res.json({ 'user_id': userId, interestId, 'access_token': access_token });
}

exports.uploadImage = async(req, res) => {
    if (req.file) {
        const { originalImage, blurredImage } = await saveImage(req.file);
        console.log({ originalImage, blurredImage });
        return res.json({ originalImage, blurredImage });
    }
    return res.json({ "nothing": "hehe" });
}