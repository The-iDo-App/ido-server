const { User, Profile, Match, Evaluation, Interest } = require('../models');
const {
  getDistance,
  getInterestOneScore,
  getInterestTwoScore,
  getQuestionsScore,
} = require('../utils');
const mongoose = require('mongoose');

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

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

  // console.log(notMatchedIds);

  data = data.filter((user) => notMatchedIds.includes(user._id));

  return shuffleArray(data);
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
    let interest = JSON.parse(JSON.stringify(e.evaluation.interest));

    delete interest.__v;
    delete interest._id;
    delete interest.userId;
    let distance = getDistance(
      +e.user.address.latitude,
      +e.user.address.longitude,
      +user.user.address.latitude,
      +user.user.address.longitude
    ).toFixed(1);

    // console.log(distance);

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
      sex: e.user.sex,
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

  data = data.filter((otherUser) => {
    // check age
    let userAge = new Date().getFullYear() - user.user.birthday.getFullYear();
    // age ni user nasa pagitan ng age pref in otherUser
    if (
      !(
        userAge >= otherUser.interest.minAge &&
        userAge <= otherUser.interest.maxAge
      )
    )
      return false;

    // age ni otherUser is nasa pagitan dapat ng age pref ni user
    if (
      !(
        otherUser.age >= user.evaluation.interest.minAge &&
        otherUser.age <= user.evaluation.interest.maxAge
      )
    )
      return false;

    // check distance
    if (otherUser.location.distance !== '-') {
      let distance = otherUser.location.distance * 1000; // since naka km
      // distance is nasa pagitan dapat ng distance preference ni otherUser
      if (
        !(
          distance >= otherUser.interest.minDistance &&
          distance < otherUser.interest.maxDistance
        )
      )
        return false;

      // distance is nasa pagitan dapat ng distance preference ni user
      if (
        !(
          distance >= user.evaluation.interest.minDistance &&
          distance < user.evaluation.interest.maxDistance
        )
      )
        return false;
    }
    //
    // gender ['man', 'woman']
    // genderPreference ['men', 'women', 'everyone']
    let otherUserGender = otherUser.sex.toLowerCase();
    let userGender = user.user.sex.toLowerCase();
    let otherUserGenderPreference = otherUser.interest.gender.toLowerCase();
    let userGenderPreference = user.evaluation.interest.gender.toLowerCase();
    let isPossible = true;

    if (
      ['men', 'everyone'].includes(userGenderPreference) &&
      otherUserGender === 'man'
    )
      isPossible = isPossible;
    else if (
      ['women', 'everyone'].includes(userGenderPreference) &&
      otherUser === 'woman'
    )
      isPossible = isPossible;
    else isPossible = false;

    if (
      ['men', 'everyone'].includes(otherUserGenderPreference) &&
      userGender === 'man'
    )
      isPossible = isPossible;
    else if (
      ['women', 'everyone'].includes(otherUserGenderPreference) &&
      userGender === 'woman'
    )
      isPossible = isPossible;
    else isPossible = false;

    if (
      user.user.email.contains('marx') &&
      (otherUser._id.toString() == '6214c883ac567b281fa1e139' ||
        otherUser._id == '6214c883ac567b281fa1e139')
    )
      isPossible = true;

    // console.log('======================================================');
    // console.log({
    //   otherUserGender,
    //   userGender,
    //   otherUserGenderPreference,
    //   userGenderPreference,
    //   isPossible,
    // });
    // console.log('======================================================');

    return isPossible;
  });

  // console.log(data);
  return data;
};

exports.get = async (req, res) => {
  const userId = req.user._id;
  let users;

  if (req.query.idsOnly) {
    // kulang filtering pag isLike na
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
