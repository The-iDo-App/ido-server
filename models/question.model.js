const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  isImportant: Boolean,
  question: String,
  choices: [String],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
