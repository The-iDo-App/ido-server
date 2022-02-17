const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
    },
    interest: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Interest',
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectID],
        ref: 'Question',
    },
    answers: [String],
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;