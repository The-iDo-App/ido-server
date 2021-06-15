const { User } = require('../models');

exports.get = async (req, res) => {
  return res.json({ success: true });
};
