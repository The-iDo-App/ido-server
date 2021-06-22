const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  isImportant: Boolean,
  Question: String,
  Choice: [String],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
