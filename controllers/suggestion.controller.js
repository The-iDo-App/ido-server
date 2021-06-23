const { User, Profile, Match, Evaluation } = require('../models');

const getInfo = async (userId, ids) => {
  let users,
    profiles,
    evaluations,
    data = [];
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

  let notMatchedIds = matches.map((match) =>
    match.participants
      .filter((user) => user.userId != userId)[0]
      .userId.toString()
  );

  data = data.filter((user) => notMatchedIds.includes(user._id));

  return data;
};

const prepare = (arr) => {
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
    data.push({
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
        distance: 10,
      },
      matchRate: '70%',
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

  users = prepare(users);
  return res.json({ success: true, users });
};
