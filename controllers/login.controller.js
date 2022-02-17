const { User } = require('../models');
const { generateToken } = require('../utils');


exports.getEmail = async(req, res) => {
    const { email } = req.body;
    let user;
    try {
        user = await User.findOne({ email })
    } catch (err) {
        throw (err)
    }
    if (user) {
        return res.status(200).json({ username: user.email });
    }
    return res.json({ "Error": "User not found!" });
}

exports.post = async(req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email, password })
    } catch (err) {
        throw (err)
    }
    if (user) {
        var access_token = generateToken(user);
        // console.log(access_token);
        return res.status(200).json({ username: user.username, userId:user._id, access_token });
    }
    return res.json({ "Error": "User not found!" });
}

exports.getGmail = async(req, res) => {
    let gmail;
    try {
        gmail = await User.findOne({ gmail: req.params.gmail });
    } catch (err) {
        throw err;
    }
    console.log(gmail);

    if (!gmail)
        return res.json({ 'Error': 'User not found' });
    return res.json({ 'success': 'true', gmail });
};

exports.getFacebook = async(req, res) => {
    let fbId;
    try {
        fbId = await User.findOne({ facebookId: req.params.fbId });
    } catch (err) {
        throw err;
    }
    console.log(fbId);
    if (!fbId)
        return res.json({ 'Error': 'User not found' });
    return res.json({ 'success': 'true', fbId });
};
