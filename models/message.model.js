const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
  participantIds: {
    type: [mongoose.Schema.Types.ObjectID],
    default: [],
  },
  body: {
    type: String,
    required: true,
  },
  timeSent: {
    type: Date,
    default: Date.now,
  },
  timeSeen: Date,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
