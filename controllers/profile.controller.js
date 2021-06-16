const fs = require('fs').promises;
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const { Profile } = require('../models');

exports.getOne = async (req, res) => {
  let user;
  try {
    user = await Profile.findOne({ userId: req.params.userId });
  } catch (err) {
    throw err;
  }
  if (!user) return res.json({ error: 'Not Found' });
  return res.json({ success: true, user });
};

exports.get = async (req, res) => {
  let users;
  try {
    users = await Profile.find();
  } catch (err) {
    throw err;
  }
  console.log(process.env.APPS_SUBDOMAIN);
  return res.json({ success: true, users });
};

exports.post = async (req, res) => {
  let { bio } = req.body;
  let user;
  console.log(req.body);
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
    try {
      let root = './public/apps/uploads/';
      let tmp_path = req.file.path;
      let target_path = root + req.file.filename + '.png';
      let originalImage =
        process.env.APPS_SUBDOMAIN + '/uploads/' + req.file.filename + '.png';
      let a = await fs.readFile(tmp_path);
      await fs.writeFile(target_path, a);

      let filename = uuidv4() + '.png';
      let blurredImage = root + filename;
      let image = await Jimp.read(originalImage);
      image
        .blur(2, function (err) {
          if (err) throw err;
        })
        .write(blurredImage);

      blurredImage = process.env.APPS_SUBDOMAIN + '/uploads/' + filename;

      console.log({ originalImage, blurredImage });
      user = await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        { $set: { picture: { originalImage, blurredImage } } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  return res.json({ success: true, user });
};
