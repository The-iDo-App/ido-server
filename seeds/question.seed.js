const { Question } = require('../models');

module.exports = async (req, res) => {
  let questions = [
    {
      question: 'How long do you anticipate your next relationship lasting?',
      choices: [
        'a. For one night',
        'b. For several months to a year',
        'c. For several years',
        'd. For the entire rest of my life',
      ],
    },
    {
      question: 'Which term best describes you?',
      choices: ['a. Playful', 'b. Dramatic'],
    },
    {
      question: 'What role does religion/God play in your life?',
      choices: [
        'a. Critical',
        'b. Significant',
        'c. Not significant',
        'd. Not significant at all',
      ],
    },
    {
      question: 'Are you prepared to settle down and marry immediately?',
      choices: [
        'a. Without a doubt',
        'b. In no way',
        'c. Marry yes, settle down no',
        'd. Marry no, settle down yes',
      ],
    },
    {
      question: 'Are you a fan of political debates?',
      choices: ['a. Yes', 'b.No'],
    },
    {
      question: 'Would you date someone who owed a lot of money?',
      choices: [
        'a. Absolutely, it is not an issue for me',
        'b. Yes, if I believed the debt was justified',
        'c. Hell no',
      ],
    },
    {
      question: 'Is the astrological sign significant in a match?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Which of the following best describes your political views?',
      choices: ['a. Liberal', 'b. Centrist', 'c. Conservative', 'd. Others'],
    },
    {
      question: 'Could you date someone who was extremely unorganized?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Which one would you prefer to be?',
      choices: ['a. Ordinary', 'b. Crazy'],
    },
    {
      question: 'Are you employed at the moment?',
      choices: [
        'a. Yes, I work full-time',
        'b. Yes, I work part-time',
        'c. No',
        'd. I am currently studying',
      ],
    },
    {
      question: 'Select the more romantic activity.',
      choices: ['a. Kissing in Paris', 'b. Kissing in the woods, in a tent'],
    },
    {
      question: 'Is jealousy a healthy emotion to have in a relationship?',
      choices: ['a. Yes', 'b. Depends upon the situation', 'c. No'],
    },
    {
      question: 'Are you a fan of scary films?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'Do you frequently find yourself worrying about events over which you have no control?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'Do you believe it is necessary to establish an emotional connection before establishing a physical one?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Is it acceptable to support racial equality silently?',
      choices: [
        'a. Yes, that is your choice',
        'b. No, it is critical that your voice be heard.',
      ],
    },
    {
      question: 'Are you going to receive the COVID-19 vaccine?',
      choices: ['a. Yes', 'b. No', 'c. I am unsure'],
    },
    {
      question: 'Would you tell someone you\'ve never met "I love you"?',
      choices: [
        'a. Certainly, if it felt right.',
        'b. No, I require a physical connection first.',
      ],
    },
    {
      question: 'What is the best icebreaker?',
      choices: [
        'a. Posing a question',
        'b. Sharing a joke',
        'c. Making a brief introduction',
        'd. Mentioning something on my profile',
      ],
    },
    {
      question: 'What would you do if the world ended in a zombie apocalypse?',
      choices: ['a. Run', 'b. Retaliate'],
    },
    {
      question: 'Do you have a voter registration card?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'Whatever your future plans, what interests you more right now?',
      choices: ['a. Sex', 'b. Love'],
    },
    {
      question: 'Is a soulmate worth waiting?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Is it critical for you to feel at ease in a relationship?',
      choices: [
        'a. Without a doubt, total comfort is critical.',
        "b. Yes, but I'm looking for someone who will push me.",
        'c. No, I prefer greater excitement.',
      ],
    },
    {
      question: 'Do you enjoy brunching?',
      choices: ['a. Yes', 'b. Not really'],
    },
    {
      question: 'When a plane lands, do you clap?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'Are you of the opinion that entertainers should be held accountable for jokes made decades ago?',
      choices: [
        'a. Yes, they must be made responsible.',
        "b. No, as long as the jokes were amusing, it's acceptable.",
      ],
    },
    {
      question: 'Could you date someone who is anti-vaccination?',
      choices: ['a. Hmmmm, yes', 'b. Nooo!!!'],
    },
    {
      question: 'Does climate change concren you?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Are you an activist?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        "Are family planning benefits a priority for you when you're job hunting?",
      choices: ['a. Definitely', 'b. Not at all'],
    },
    {
      question: 'Would you date someone who vaped/used electronic cigarettes?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'How do you feel when you see people who are engaged in your social media accounts?',
      choices: ['a. Kudos to them', 'b. Admittedly a little envious'],
    },
    {
      question:
        'How comfortable are you with discussing politics with your family?',
      choices: ['a. It is critical', 'b. Certainly not'],
    },
    {
      question: 'Shower sex?',
      choices: ['a. Yes, please', 'b. Thank you, but no'],
    },
    {
      question: 'Is pizza one of your top five favorite foods?',
      choices: ['a. Yes', 'b. Nope'],
    },
    {
      question:
        'After the pandemic, which ""first"" makes you the most nervous?',
      choices: [
        'a. The very first date',
        'b. The very first kiss',
        'c. The very first sleepover',
        'd. The very first meeting with his/her friends/family',
      ],
    },
    {
      question: 'Is punctuality important to you?',
      choices: ['a. Without a doubt', 'b. Not at all'],
    },
    {
      question: 'Do you believe sabong should be prohibited?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Do you think pool is a good first date activity?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Do you enjoy shopping at the mall?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Dinuguan?',
      choices: ['a. Definitely', 'b. No, thanks'],
    },
    {
      question: 'Do you think eating kamayan on a date is appropriate?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question:
        'Would you kiss your partner on the lips in public if you were in a relationship?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Is it possible to date someone who does not vote?',
      choices: ['a. Yes', 'b. Certainly not'],
    },
    {
      question: 'What is the best first date?',
      choices: [
        'a. Coffee',
        'b. Something with a cultural or activity component',
        'c. Drinks',
        'd. Dinner',
      ],
    },
    {
      question:
        'Is there anyone you know who has married someone they met through a dating app?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'Do you want your date to share your political beliefs?',
      choices: ['a. Yes', 'b. No'],
    },
    {
      question: 'The right to freedom of the press is…',
      choices: ['a. Important', 'b. Unimportant'],
    },
  ];
  questions = questions.map((question) => {
    return { ...question, isImportant: true };
  });

  await Question.insertMany(questions);
};
