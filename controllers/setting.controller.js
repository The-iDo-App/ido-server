const {
  User,
  Profile,
  Message,
  Interest,
  Match,
  Evaluation,
} = require('../models');
const mongoose = require('mongoose');

exports.accountDeletion = async (req, res) => {
  const userId = req.user._id;
  try {
    await User.deleteOne({ _id: userId });
    await Profile.deleteOne({ userId });
    await Interest.deleteOne({ userId });
    await Evaluation.deleteOne({ userId });
    await Message.deleteMany({ participantIds: { $in: [userId] } });
    await Match.deleteMany({
      participants: { $elemMatch: { userId } },
    });
  } catch (err) {
    throw err;
  }
  return res.json({ success: true });
};

exports.personalInformation = async (req, res) => {
  const userId = req.user._id;
  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (err) {
    throw err;
  }
  return res.json({ success: true, user });
};

exports.getBlockedUsers = async (req, res) => {
  const userId = req.user._id;
  let user, profiles;
  try {
    user = await User.findOne({ _id: userId }).populate('blockedUsers');
  } catch (err) {
    throw err;
  }
  try {
    profiles = await Profile.find();
  } catch (err) {
    throw err;
  }
  let users = user.blockedUsers.map((user) => {
    const { _id, username, firstName, lastName, email } = user;
    let profile = profiles.filter((profile) => {
      // console.log(profile.userId, user._id);
      return profile.userId.toString() == user._id.toString();
    })[0];
    return { _id, username, firstName, lastName, email, profile };
  });
  //console.log(users);
  return res.json({ success: true, users });
};

exports.unblockUser = async (req, res) => {
  const userId = req.user._id;
  const { user_id: unblockUserId } = req.body;
  let user;
  try {
    user = await User.findOne({ _id: userId });
    user.blockedUsers = user.blockedUsers.filter((id) => id != unblockUserId);
    user = await user.save();
    return res.json({ success: true, user });
  } catch (err) {
    throw err;
  }
};

exports.blockUser = async (req, res) => {
  const userId = req.user._id;
  const { user_id: blockedUserId } = req.body;
  let user, blockedUser;
  if (userId === blockedUserId)
    return res.json({ error: "You can't block yourself" });
  try {
    blockedUser = await User.findOne({ _id: blockedUserId });
    if (blockedUser) {
      user = await User.findOne({ _id: userId });
      if (user.blockedUsers.includes(blockedUserId)) {
        return res.json({ error: 'User already blocked' });
      }
      user.blockedUsers.push(blockedUserId);
      user = await user.save();
      return res.json({ success: true, user });
    }
    return res.json({ error: 'User Id not found' });
  } catch (err) {
    throw err;
  }
};

exports.leaveConversation = async (req, res) => {
  const userId = req.user._id;
  const { user_id: otherUserId } = req.body;
  let chats = await Message.deleteMany({
    participantIds: {
      $all: [
        mongoose.Types.ObjectId(userId),
        mongoose.Types.ObjectId(otherUserId),
      ],
    },
  });
  let user, blockedUser;
  if (userId === otherUserId)
    return res.json({ error: "You can't block yourself" });
  try {
    blockedUser = await User.findOne({ _id: otherUserId });
    if (blockedUser) {
      user = await User.findOne({ _id: userId });
      if (user.blockedUsers.includes(otherUserId)) {
        return res.json({ error: 'User already blocked' });
      }
      user.blockedUsers.push(otherUserId);
      user = await user.save();
      return res.json({ success: true, user });
    }
    return res.json({ error: 'User Id not found' });
  } catch (err) {
    throw err;
  }
};
