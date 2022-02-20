const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
  createdFor: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
