const { User, Profile, Match, Evaluation } = require('../models');
const {
  getDistance,
  getInterestOneScore,
  getInterestTwoScore,
  getQuestionsScore,
} = require('../utils');
const mongoose = require('mongoose');

const getInfo = async (userId, ids) => {
  let users,
    profiles,
    evaluations,
    data = [],
    matches;
  try {
    users = ids
      ? await User.find({ _id: { $in: ids } })
      : await User.find({ _id: { $ne: userId } });
    profiles = ids
      ? await Profile.find({ userId: { $in: ids } })
      : await Profile.find({ userId: { $ne: userId } });
    evaluations = ids
      ? await Evaluation.find({ userId: { $in: ids } }).populate('interest')
      : await Evaluation.find({ userId: { $ne: userId } }).populate('interest');
    matches = await Match.find({
      participants: { $elemMatch: { userId, isLike: false } },
    });
  } catch (err) {
    throw err;
  }

  ids = ids
    ? ids
    : JSON.parse(JSON.stringify(evaluations.map((user) => user.userId)));

  ids.map((id) => {
    let user = users.filter((user) => id == user._id)[0];
    let profile = profiles.filter((profile) => id == profile.userId)[0];
    let evaluation = evaluations.filter(
      (evaluation) => id == evaluation.userId
    )[0];
    data.push({ _id: id, user, profile, evaluation });
  });

  let notMatchedIds = matches.map((match) => {
    let temp = match.participants.filter((user) => {
      return user.userId.toString() !== userId;
    });
    // eto may sobra kasi, userId tas userId so blank match
    return temp.length ? temp[0].userId.toString() : '';
  });

  // tanggalin ung sobra
  notMatchedIds = notMatchedIds.filter((id) => id);

  console.log(notMatchedIds);

  data = data.filter((user) => notMatchedIds.includes(user._id));

  return data;
};

const getUserInfo = async (userId) => {
  let user, profile, evaluation;
  try {
    user = await User.findOne({ _id: userId });
    profile = await Profile.findOne({ userId });
    evaluation = await Evaluation.findOne({ userId }).populate('interest');
  } catch (err) {
    throw err;
  }

  return { _id: userId, user, profile, evaluation };
};

const prepare = (arr, user) => {
  let data = [];
  arr.map((e) => {
    let today = new Date();
    let age = today.getFullYear() - e.user.birthday.getFullYear();
    let m = today.getMonth() - e.user.birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < e.user.birthday.getDate())) {
      age--;
    }
    interest = JSON.parse(JSON.stringify(e.evaluation.interest));

    delete interest.__v;
    delete interest._id;
    delete interest.userId;
    let distance = getDistance(
      e.user.address.latitude,
      e.user.address.longitude,
      user.user.address.latitude,
      user.user.address.longitude
    ).toFixed(1);

    let matchRate =
      getInterestOneScore(e, user) * 0.3 +
      getInterestTwoScore(e, user) * 0.45 +
      getQuestionsScore(e, user) * 0.25;

    matchRate = Math.round(matchRate) + '%';

    data.push({
      _id: e.user._id,
      username: e.user.username,
      firstName: e.user.firstName,
      lastName: e.user.lastName,
      orientation: e.user.orientation,
      employment: e.user.employment,
      verificationStatus: e.user.verificationStatus,
      picture: e.profile.picture,
      shortDescription: e.profile.shortDescription,
      location: {
        city: e.user.address.city,
        province: e.user.address.province,
        country: e.user.address.country,
        distance: distance.toString() === 'NaN' ? '-' : distance,
      },
      matchRate,
      age,
      interest,
    });
  });
  return data;
};

exports.get = async (req, res) => {
  const userId = req.user._id;
  let users;

  if (req.query.idsOnly) {
    let ids;
    try {
      ids = await Evaluation.find({ userId: { $ne: userId } }, 'userId');
    } catch (err) {
      throw err;
    }
    ids = ids.map((id) => id.userId);
    return res.json({ success: true, ids });
  } else if (req.query.batch) {
    try {
      users = await getInfo(userId, req.query.ids);
    } catch (err) {
      throw err;
    }
  } else {
    try {
      users = await getInfo(userId);
    } catch (err) {
      throw err;
    }
  }

  let user;
  try {
    user = await getUserInfo(userId);
  } catch (err) {
    throw err;
  }
  users = prepare(users, user);
  return res.json({ success: true, users });
};

exports.post = async (req, res) => {
  let userId = req.user._id;
  let otherUserId = req.params.userId;
  let match;
  try {
    match = await Match.findOne({
      participants: {
        $all: [
          {
            $elemMatch: {
              userId: mongoose.Types.ObjectId(userId),
              isLike: false,
            },
          },
          {
            $elemMatch: { userId: mongoose.Types.ObjectId(otherUserId) },
          },
        ],
      },
    });
  } catch (err) {
    throw err;
  }

  let isNew = false;
  if (match) {
    let participants = match.participants;
    participants = participants.map((user) => {
      if (user.userId == userId) {
        user.isLike = true;
      }
      return user;
    });
    try {
      await match.save();
    } catch (err) {
      throw err;
    }
  } else {
    isNew = true;
    try {
      match = await Match.create({
        participants: [
          { userId, isLike: true },
          { userId: otherUserId, isLike: false },
        ],
      });
    } catch (err) {
      throw err;
    }
  }

  return res.json({ match, isNew });
};
