const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
  gender: {
    type: String,
    default: '',
  },
  minAge: {
    type: Number,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
  minDistance: {
    type: Number,
    required: true,
  },
  maxDistance: {
    type: Number,
    required: true,
  },
  astrologicalSign: {
    type: String,
    default: '',
  },
  religion: {
    type: String,
    default: '',
  },
  politicalView: {
    type: String,
    default: '',
  },
  drink: {
    type: String,
    default: '',
  },
  smoke: {
    type: String,
    default: '',
  },
  wantKids: {
    type: String,
    default: '',
  },
  pets: {
    type: [String],
    default: [],
  },
  passion: {
    type: [String],
    default: [],
  },
  musicGenre: {
    type: [String],
    default: [],
  },
  movieGenre: {
    type: [String],
    default: [],
  },
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
