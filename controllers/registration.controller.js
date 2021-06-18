const { JWT_SECRET } = process.env;
const { Profile } = require('../models');
const jwt = require('jsonwebtoken');

exports.get = (req, res) => {
    res.json({ 'registration': 'welcome' });

}

exports.getOne = async(req, res) => {
    let user;
    try {
        // user = await Profile.findOne({ userId: req.params.userId });
    } catch (err) {
        throw err;
    }
    if (!user) return res.json({ error: 'Not Found' });
    return res.json({ success: true, user });
};

exports.post = (req, res) => {
    // const access_token = localStorage.getItem('access_token');
    jwt.verify(access_tokens, JWT_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Welcome to registration',
                data,
            });
        }
    });
}