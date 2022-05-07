const { Avatar } = require("../models");

exports.getAvatars = async (req, res) => {
  let avatars;
  try {
    avatars = await Avatar.find();
  } catch (err) {
    throw err;
  }
  if (avatars) return res.json({ avatars });
  else return res.json({ message: "internal server error" });
};
