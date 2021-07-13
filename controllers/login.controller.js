// http://localhost:5000/api/logins/facebook/${fbId}

const { User } = require('../models');

exports.get = async(req, res) => {
    res.json({ 'success': 'true' });
}

exports.getGmail = async(req, res) => {
    let gmail = req.params;
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