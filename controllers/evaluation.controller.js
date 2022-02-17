const { Evaluation, Question } = require('../models');

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

exports.getAnswers = async(req, res) => {
    let questions = [];
    let user;
    let {userId} = req.params;
    try{    
        user = await Evaluation.findOne({userId}).populate('questions');
        user.questions.map(q => questions.push(q.question));
        
    }catch(err){
        console.log(err)
    }
    if(questions.length) return res.json({questions,answers:user.answers});
    return res.json({error: 'Not found'});
}