const { Profile } = require('../models');

exports.getOne = async (req, res) => {
  let user;
  try {
    user = await Profile.findOne({ userId: req.params.userId });
  } catch (err) {
    throw err;
  }
  if (!user) return res.json({ error: 'Not Found' });
  return res.json({ success: true, user });
};

exports.get = async (req, res) => {
  let users;
  try {
    users = await Profile.find();
  } catch (err) {
    throw err;
  }
  return res.json({ success: true, users });
};
