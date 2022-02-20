const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User, Interest, Profile, Match } = require('../models');
const { generateToken, saveImage } = require('../utils');

exports.getUser = async(req, res) => {
    let { email } = req.body;
    let user;
    try {
        user = await User.findOne({ email })
    } catch (err) {
        throw err;
    }
    return res.json({ 'success': 'true', user });
};

exports.getUser = async(req, res) => {
    let { email } = req.body;
    let user;
    try {
        user = await User.findOne({ email })
    } catch (err) {
        throw err;
    }
    return res.json({ 'success': 'true', user });
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

        let user_id = userId;
        let userIds = await User.find({}, {
            _id: 1
        });

        let data = []
        userIds.map(user => {
            data.push({
                participants: [
                    { isLike: false, userId: user._id },
                    { isLike: false, userId: user_id },
                ],
            })
        })

        await Match.insertMany(data)

        const { originalImage, blurredImage, avatar } = req.body;
        let userProfile = await Profile.create({
            picture: {
                originalImage,
                blurredImage,
                avatar
            },
            userId,
        });

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
    // console.log(access_token);
    return res.json({ user_id: userId, interestId, access_token });
}

exports.uploadImage = async(req, res) => {
    if (req.file) {
        const { originalImage, blurredImage } = await saveImage(req.file);
        console.log({ originalImage, blurredImage });
        return res.status(200).json({ originalImage, blurredImage });
    }
    return res.json({ "Error": "File missing!" });
}