const { User } = require('../models');

exports.get = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    throw err;
  }
  return res.json({ success: true, users });
};
