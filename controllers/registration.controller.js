const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const avatars = [
  { id: 25, avatar: 'Asset-154.png' },
  { id: 26, avatar: 'Asset-155.png' },
  { id: 27, avatar: 'Asset-156.png' },
  { id: 28, avatar: 'Asset-157.png' },
  { id: 29, avatar: 'Asset-158.png' },
  { id: 30, avatar: 'Asset-159.png' },
  { id: 31, avatar: 'Asset-160.png' },
  { id: 32, avatar: 'Asset-161.png' },
  { id: 33, avatar: 'Asset-162.png' },
  { id: 34, avatar: 'Asset-163.png' },
  { id: 35, avatar: 'Asset-164.png' },
  { id: 36, avatar: 'Asset-165.png' },
  { id: 37, avatar: 'Asset-166.png' },
  { id: 38, avatar: 'Asset-167.png' },
  { id: 39, avatar: 'Asset-168.png' },
  { id: 40, avatar: 'Asset-169.png' },
  { id: 41, avatar: 'Asset-170.png' },
  { id: 42, avatar: 'Asset-171.png' },
  { id: 43, avatar: 'Asset-172.png' },
  { id: 44, avatar: 'Asset-173.png' },
  { id: 45, avatar: 'Asset-174.png' },
  { id: 46, avatar: 'Asset-175.png' },
  { id: 47, avatar: 'Asset-176.png' },
  { id: 48, avatar: 'Asset-177.png' },
  { id: 49, avatar: 'Asset-178.png' },
  { id: 50, avatar: 'Asset-179.png' },
  { id: 51, avatar: 'Asset-180.png' },
  { id: 52, avatar: 'Asset-181.png' },
  { id: 53, avatar: 'Asset-182.png' },
  { id: 54, avatar: 'Asset-183.png' },
  { id: 55, avatar: 'Asset-184.png' },
  { id: 56, avatar: 'Asset-185.png' },
  { id: 57, avatar: 'Asset-186.png' },
  { id: 58, avatar: 'Asset-188.png' },
  { id: 59, avatar: 'Asset-189.png' },
  { id: 60, avatar: 'Asset-190.png' },
  { id: 61, avatar: 'Asset-191.png' },
  { id: 62, avatar: 'Asset-192.png' },
  { id: 63, avatar: 'Asset-193.png' },
  { id: 64, avatar: 'Asset-194.png' },
  { id: 65, avatar: 'Asset-195.png' },
  { id: 66, avatar: 'Asset-196.png' },
  { id: 67, avatar: 'Asset-197.png' },
  { id: 68, avatar: 'Asset-198.png' },
  { id: 69, avatar: 'Asset-199.png' },
  { id: 70, avatar: 'Asset-200.png' },
  { id: 71, avatar: 'Asset-201.png' },
  { id: 72, avatar: 'Asset-202.png' },
  { id: 73, avatar: 'Asset-203.png' },
];

avatars.map(
  (avatar) =>
    (avatar.avatar =
      'https://raw.githubusercontent.com/The-iDo-App/ido-server/main/public/apps/images/avatars/' +
      avatar.avatar)
);

const { User, Interest, Profile, Match } = require('../models');
const { generateToken, saveImage } = require('../utils');

exports.getUser = async (req, res) => {
  let { email } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    throw err;
  }
  return res.json({ success: 'true', user });
};

exports.getUser = async (req, res) => {
  let { email } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    throw err;
  }
  return res.json({ success: 'true', user });
};

exports.createUser = async (req, res) => {
  //USER PROFILE
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    sex,
    orientation,
    employment,
    address,
  } = req.body;
  const birthday = new Date(req.body.birthday);
  //INTEREST PREFERENCE
  const minDistance = 0;
  const {
    genderPref,
    minAge,
    maxAge,
    maxDistance,
    astrologicalSign,
    religion,
    politicalView,
    smoke,
    wantKids,
    wantMarried,
  } = req.body;

  //MULTI SELECT PREF
  const { sports, hobbies, musicGenre, movieGenre, pets, books, food, drinks } =
    req.body;

  let userId;
  let interestId;
  let user;

  try {
    user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      birthday,
      sex,
      orientation,
      address,
      employment,
    });
    userId = user._id;

    let user_id = userId;
    let userIds = await User.find(
      {},
      {
        _id: 1,
      }
    );

    let data = [];
    userIds.map((user) => {
      data.push({
        participants: [
          { isLike: false, userId: user._id },
          { isLike: false, userId: user_id },
        ],
      });
    });

    await Match.insertMany(data);

    const { originalImage, blurredImage, avatar: avatarId } = req.body;
    console.log(req.body);
    let avatar = avatars.filter((avatar) => avatar.id == avatarId);
    console.log(avatar);
    avatar = avatar.length ? avatar[0].avatar : '';
    let userProfile = await Profile.create({
      picture: {
        originalImage,
        blurredImage,
        avatar,
      },
      userId,
    });

    let userInterest = await Interest.create({
      userId,
      genderPref,
      minAge,
      maxAge,
      minDistance,
      maxDistance,
      astrologicalSign,
      religion,
      politicalView,
      smoke,
      wantKids,
      wantMarried,
      sports,
      hobbies,
      musicGenre,
      movieGenre,
      pets,
      books,
      food,
      drinks,
    });
    interestId = userInterest._id;
  } catch (err) {
    throw err;
  }
  var access_token = generateToken(user);
  // console.log(access_token);
  return res.json({ user_id: userId, interestId, access_token });
};

exports.uploadImage = async (req, res) => {
  if (req.file) {
    const { originalImage, blurredImage } = await saveImage(req.file);
    console.log({ originalImage, blurredImage });
    return res.status(200).json({ originalImage, blurredImage });
  }
  return res.json({ Error: 'File missing!' });
};
