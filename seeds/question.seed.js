const { Question } = require('../models');

module.exports = async (req, res) => {
  await Question.deleteMany({});
  let questions = [
    {
      question: '1. How long do you anticipate your next relationship lasting?',
      choices: [
        'a. For one night',
        'b. For several months to a year',
        'c. For several years',
        'd. For the entire rest of my life',
      ],
    },
    {
      question: '2. What role does religion/God play in your life?',
      choices: [
        'a. Extremely important',
        'b. Somewhat important',
        'c. Not very important',
        'd. Not important at all',
      ],
    },
    {
      question: '3. Are you prepared to settle down and marry immediately?',
      choices: [
        'a. Without a doubt',
        'b. In no way',
        'c. Marry yes, settle down no',
        'd. Marry no, settle down yes',
      ],
    },
    {
      question:
        '4. Do you believe it is necessary to establish an emotional connection before establishing a physical one?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: '5. Would you tell someone you\'ve never met "I love you"?',
      choices: [
        'a. Certainly, if it felt right.',
        'b. No, I require a physical connection first.',
      ],
    },
    {
      question:
        '6. Whatever your future plans, what interests you more right now?',
      choices: ['a. Sex', 'b. Love'],
    },
    {
      question: '7. Is a soulmate worth waiting?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: '8. Is it critical for you to feel at ease in a relationship?',
      choices: [
        'a. Without a doubt, total comfort is critical.',
        "b. Yes, but I'm looking for someone who will push me.",
        'c. No, I prefer greater excitement.',
      ],
    },
    {
      question: '9. What is the best first date?',
      choices: [
        'a. Coffee',
        'b. Something with a cultural or activity component',
        'c. Drinks',
        'd. Dinner',
      ],
    },
    {
      question: '10.  Shower sex?',
      choices: ['a. Yes, please', 'b. No'],
    },
    {
      question:
        '11.  Which of the following best describes your political views?',
      choices: ['a. Liberal', 'b. Centrist', 'c. Conservative', 'd. Others'],
    },
    {
      question:
        '12.  How would you feel if your partner earned more money than you?',
      choices: ['a. Jealous', 'b. Indifferent', 'c. Inferior', 'd. Thrilled'],
    },
    {
      question: '13.  Would you be open to a long-distance relationship?',
      choices: [
        'a. Yes, for the right person we can make it work',
        'b. It depends on how far away they are',
        "c. No, I can't do long distance",
      ],
    },
    {
      question: '14.  Do you support Duterte war on drugs?',
      choices: ['a. Yes, it is what we need', 'b. No, it is too harsh'],
    },
    {
      question:
        'Would you have children with a partner if you were not married?',
      choices: ['a. Yes', 'b. No'],
    },
  ];
  questions = questions.map((question) => {
    return { ...question, isImportant: true };
  });

  await Question.insertMany(questions);
};
