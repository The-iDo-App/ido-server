const { Evaluation } = require('../models');

exports.post = async(req, res) => {
    const { userId, interest, questions, answers } = req.body;
    let evals;
    try {
        evals = await Evaluation.create({
            userId,
            interest,
            questions,
            answers
        });
    } catch (err) {
        throw err;
    }
    if (evals) return res.json({ evals });
    else return res.json({ "Error": "Invalid Connection" });

}