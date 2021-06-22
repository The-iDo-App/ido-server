const {
  User,
  Interest,
  Match,
  Evaluation,
  Message,
  Question,
} = require('../models');

module.exports = async () => {
  await Interest.deleteMany({});
  await Question.deleteMany({});
  await Evaluation.deleteMany({});
  await Match.deleteMany({});
  await Message.deleteMany({});

  let questions = [];
  'abcde'.split('').map((question) => {
    questions.push({
      isImportant: false,
      question,
      choices: [],
    });
  });
  questions = await Question.create(questions);
  questions = questions.map((question) => question._id);
  let users = await User.find();
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let interest = await Interest.create({
      userId: user._id,
      maxDistance: 90,
      minDistance: 10,
      minAge: 10,
      maxAge: 90,
    });
    await Evaluation.create({
      userId: user._id,
      interest: interest._id,
      questions,
      answers: ['a', 'b', 'c', 'd', 'e'],
    });

    let currentId = user._id;
    for (let j = i + 1; j < users.length; j++) {
      await Message.create({
        participantIds: [currentId, users[j]._id],
        body: 'a',
        senderId: currentId,
      });
      await Message.create({
        participantIds: [currentId, users[j]._id],
        body: 'b',
        senderId: currentId,
      });
      await Message.create({
        participantIds: [currentId, users[j]._id],
        body: 'c',
        senderId: currentId,
      });
      await Match.create({
        participants: [
          { isLike: true, userId: currentId },
          { isLike: false, userId: users[j]._id },
        ],
      });
    }
  }
};
