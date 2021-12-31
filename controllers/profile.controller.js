const { Profile, Interest } = require('../models');
const { saveImage } = require('../utils');

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

exports.get = async(req, res) => {
    let users;
    try {
        users = await Profile.find();
    } catch (err) {
        throw err;
    }
    return res.json({ success: true, users });
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