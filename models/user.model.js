const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    default: '',
  },
  facebookId: {
    type: String,
    default: '',
  },
  gmail: {
    type: String,
    default: '',
  },
  orientation: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
    required: true,
  },
  showActiveStatus: {
    type: Boolean,
    default: true,
  },
  activeStatus: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online',
  },
  verificationStatus: {
    type: String,
    enum: ['verified', 'unverified', 'pending'],
    default: 'unverified',
  },
  address: {
    city: {
      type: String,
      default: '',
    },
    province: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    latitude: {
      type: String,
      default: '',
    },
    longitude: {
      type: String,
      default: '',
    },
  },
  employment: {
    companyName: { type: String, default: '' },
    position: { type: String, default: '' },
  },
  blockedUsers: {
    type: [mongoose.Schema.Types.ObjectID],
    default: [],
    ref: 'User',
  },
  leftConversations: {
    type: [mongoose.Schema.Types.ObjectID],
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
