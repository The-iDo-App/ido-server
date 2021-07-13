const { Avatar } = require('../models');

exports.getAvatars = async(req, res) => {
    let avatars;
    try {
        avatars = await Avatar.find();
    } catch (err) {
        throw err;
    }
    return res.json({ avatars });
};