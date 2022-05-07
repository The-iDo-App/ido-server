const { User, Profile, Interest } = require("../models");
const { saveImage } = require("../utils");
const { avatars } = require("./registration.controller");

exports.put = async (req, res) => {
  let { userId } = req.params;
  let interest;
  console.log(req.body);
  try {
    interest = await Interest.findOneAndUpdate(
      { userId },
      { $set: req.body.preferences },
      { new: true }
    );
  } catch (err) {
    throw err;
  }

  if (interest.modifiedCount) return res.json({ success: true, interest });
  else return res.json({ message: "User not found" });
};

exports.get = async (req, res) => {
  let interests;
  let profiles;
  let users;
  let { userId } = req.params;
  let filteredUser;
  try {
    interests = await Interest.find().populate("userId");
    profiles = await Profile.find().populate("userId");
  } catch (err) {
    throw err;
  }
  if (profiles) {
    users = JSON.parse(JSON.stringify(profiles));
    users.map((profile) => {
      profile.interest = interests.filter(
        (interest) =>
          JSON.stringify(profile.userId) === JSON.stringify(interest.userId) &&
          profile.userId !== null
      )[0];
    });
    filteredUser = users.filter(
      (profile) =>
        profile.userId._id.toString() !== userId && profile.userId !== null
    );
    return res.json({ users: filteredUser });
  }
  return res.json({ message: "Not found" });
};

exports.getOne = async (req, res) => {
  let user, interest;
  try {
    user = await Profile.findOne({ userId: req.params.userId });
    interest = await Interest.findOne({ userId: req.params.userId });
  } catch (err) {
    throw err;
  }
  if (!user) return res.json({ error: "Not Found" });
  return res.json({ success: true, user, interest });
};

exports.getUserInfo = async (req, res) => {
  let { userId } = req.body;
  let user, interest, profile;
  try {
    user = await User.findOne({ _id: userId });
    interest = await Interest.findOne({ userId });
    profile = await Profile.findOne({ userId });
  } catch (err) {
    throw err;
  }
  if (user) return res.json({ userId, user, interest, profile });
  return res.json({ message: "Not found" });
};

exports.getUsers = async (req, res) => {
  let users;
  try {
    users = await Profile.find().populate("userId");
    users = users.filter((user) => user.userId !== null);
  } catch (err) {
    throw err;
  }
  if (users) return res.json({ success: true, users });
  return res.json({ message: "Not found" });
};

exports.post = async (req, res) => {
  let { bio, picture, avatar } = req.body;
  let user;
  if (bio) {
    try {
      user = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        { $set: { shortDescription: bio } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  if (req.file) {
    // pag file
    try {
      const { originalImage, blurredImage } = await saveImage(req.file);

      // console.log({ originalImage, blurredImage });
      user = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        { $set: { picture: { originalImage, blurredImage } } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  } else if (picture) {
    // pag link
    try {
      user = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        { $set: { picture } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  } else if (avatar) {
    // pag avatar id
    avatar = avatars.filter((a) => a.id == avatar);
    avatar = avatar.length ? avatar[0].avatar : "";
    try {
      user = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        { $set: { picture: { avatar } } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  return res.json({ success: true, user });
};
