const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  picture: String,
});

const Avatar = mongoose.model('Avatar', avatarSchema);

module.exports = Avatar;
