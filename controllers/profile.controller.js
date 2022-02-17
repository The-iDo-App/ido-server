const { User, Profile, Interest } = require('../models');
const { saveImage } = require('../utils');

exports.get = async(req, res) => {
    let interests;
    let profiles;
    let users;
    let {userId} = req.params;
    let filteredUser;
    try {
        interests = await Interest.find().populate('userId');
        profiles = await Profile.find().populate('userId');
        users = JSON.parse(JSON.stringify(profiles));
        users.map(profile => {
            profile.interest = interests.filter(interest => JSON.stringify(profile.userId) === JSON.stringify(interest.userId)
            && profile.userId !== null)[0];
        })
        filteredUser = users.filter(profile => profile.userId._id.toString() !== userId);
    } catch (err) {
        throw err;
    }
    if (profiles.length) return res.json({ users: filteredUser });
    return res.json({ error: "Not found" });
};

exports.getOne = async(req, res) => {
    let user, interest;
    try {
        user = await Profile.findOne({ userId: req.params.userId });
        interest = await Interest.findOne({ userId: req.params.userId });
    } catch (err) {
        throw err;
    }
    if (!user) return res.json({ error: 'Not Found' });
    return res.json({ success: true, user, interest });
};

exports.getUserInfo = async(req, res) => {
    let { userId } = req.body;
    let user, interest, profile;
    try {
        user = await User.findOne({ _id: userId });
        interest = await Interest.findOne({ userId });
        profile = await Profile.findOne({ userId });
    } catch (err) {
        throw err;
    }
    if (user) return res.json({ userId, user, interest, profile });
    return res.json({ error: 'Not found' })
};


exports.getUsers = async(req, res) => {
    let users;
    try {
        users = await Profile.find().populate('userId');
        users = users.filter(user => user.userId !== null);
    } catch (err) {
        throw err;
    }
    if (users) return res.json({ success: true, users });
    return res.json({ error: "Not found" });
};


exports.post = async(req, res) => {
    let { bio } = req.body;
    let user;
    console.log(req.body);
    if (bio) {
        try {
            user = await Profile.findOneAndUpdate({ userId: req.params.userId }, { $set: { shortDescription: bio } }, { new: true });
        } catch (err) {
            throw err;
        }
    }
    if (req.file) {
        try {
            const { originalImage, blurredImage } = await saveImage(req.file);

            console.log({ originalImage, blurredImage });
            user = await Profile.findOneAndUpdate({ userId: req.params.userId }, { $set: { picture: { originalImage, blurredImage } } }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    return res.json({ success: true, user });
};