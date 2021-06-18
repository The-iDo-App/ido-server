const { JWT_SECRET } = process.env;
const { Profile } = require('../models');
const jwt = require('jsonwebtoken');


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

exports.get = async(req, res) => {
    res.json({ access_token: req.params.userId })
}

exports.post = async(req, res) => {
    const user = {
        user_id: 1,
        username: 'testing',
        email: 'test@gmail.com',
    }
    jwt.sign({ user: user }, JWT_SECRET, (err, access_token) => {
        // localStorage.setItem('access_token', access_token);
        return res.json({
            access_token: 'Bearer ' + access_token,
        });
    });
}