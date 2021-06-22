const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
      },
      isLike: {
        type: Boolean,
        default: false,
      },
    },
  ],
  start: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: '',
  },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
