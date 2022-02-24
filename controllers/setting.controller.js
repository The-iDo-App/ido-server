const {
  User,
  Profile,
  Message,
  Interest,
  Match,
  Evaluation,
  Report,
} = require('../models');
const mongoose = require('mongoose');

const blockUser = async (userId, otherUserId) => {
  if (userId === otherUserId) return { error: "You can't block yourself" };
  try {
    let blockedUser = await User.findOne({ _id: otherUserId });
    if (blockedUser) {
      let user = await User.findOne({ _id: userId });
      if (user.blockedUsers.includes(otherUserId)) {
        return { error: 'User already blocked' };
      }
      user.blockedUsers.push(otherUserId);
      user = await user.save();
      return { success: true, user };
    }
    return { error: 'User Id not found' };
  } catch (err) {
    throw err;
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return res.json({ error: true, message: "New Passwords don't match" });
  if (newPassword.length < 8)
    return res.json({
      error: true,
      message: 'Password must be at least 8 characters',
    });

  let user;
  try {
    user = await User.findOne({ _id: userId, password: oldPassword });
  } catch (err) {
    throw err;
  }

  if (!user)
    return res.json({ error: true, message: 'Old password is incorrect' });

  if (user.password === newPassword)
    return res.json({
      error: true,
      message: "New password can't be current password",
    });

  try {
    user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { password: newPassword } },
      { new: true }
    );
  } catch (err) {
    throw err;
  }

  if (user) return res.json({ success: true, message: 'Password updated!' });

  return res.json({ error: true, message: 'Something went wrong' });
};

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
  let data;

  try {
    data = await blockUser(userId, blockedUserId);
  } catch (err) {
    throw err;
  }
  return res.json(data);
};

exports.leaveConversation = async (req, res) => {
  const userId = req.user._id;
  const { user_id: otherUserId } = req.body;

  try {
    let chats = await Message.deleteMany({
      participantIds: {
        $all: [
          mongoose.Types.ObjectId(userId),
          mongoose.Types.ObjectId(otherUserId),
        ],
      },
    });
  } catch (err) {
    throw err;
  }

  try {
    data = await blockUser(userId, otherUserId);
  } catch (err) {
    throw err;
  }
  return res.json(data);
};

exports.reportUser = async (req, res) => {
  const userId = req.user._id;
  const { user_id: otherUserId } = req.body;

  try {
    await Report.create({ createdBy: userId, createdFor: otherUserId });
  } catch (err) {
    throw err;
  }

  try {
    data = await blockUser(userId, otherUserId);
  } catch (err) {
    throw err;
  }
  return res.json(data);
};
