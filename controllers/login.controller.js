const { User } = require("../models");
const { generateToken } = require("../utils");

exports.getEmail = async (req, res) => {
  const { email } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    throw err;
  }
  if (user) {
    return res.status(200).json({ username: user.email });
  }
  return res.json({ message: "User not found!" });
};

exports.post = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email, password });
  } catch (err) {
    throw err;
  }
  if (user) {
    var access_token = generateToken(user);
    // console.log(access_token);
    return res
      .status(200)
      .json({
        message: "Login successful!",
        username: user.username,
        userId: user._id,
        access_token,
      });
  }
  return res.json({ message: "User not found!" });
};

exports.getGmail = async (req, res) => {
  let gmail;
  try {
    gmail = await User.findOne({ gmail: req.params.gmail });
  } catch (err) {
    throw err;
  }

  if (gmail) return res.json({ success: "true", gmail });
  else return res.json({ message: "User not found" });
};

exports.getFacebook = async (req, res) => {
  let fbId;
  try {
    fbId = await User.findOne({ facebookId: req.params.fbId });
  } catch (err) {
    throw err;
  }
  console.log(fbId);
  if (!fbId) return res.json({ message: "User not found" });
  return res.json({ success: "true", fbId });
};
