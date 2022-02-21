const {
  User,
  Interest,
  Match,
  Evaluation,
  Message,
  Question,
} = require('../models');
const faker = require('faker');

const random = (arr, min = 1, max = 1) => {
  arr = arr.slice(0);
  let chosen = [];
  let n = Math.floor(Math.random() * (max + 1 - min)) + min;
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * arr.length);
    chosen.push(arr[index]);
    arr.splice(index, 1);
  }
  if (min === max && min === 1) {
    return chosen[0];
  }
  return chosen;
};

module.exports = async () => {
  await Interest.deleteMany({});
  await Evaluation.deleteMany({});
  await Match.deleteMany({});
  await Message.deleteMany({});

  let questions = await Question.find();
  let temp = questions;
  questions = questions.map((question) => question._id);

  let users = await User.find();
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let answers = temp.map((question) => random(question.choices));
    let astrologicalSign = random([
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ]);
    let religion = random([
      'No Religion',
      'Roman Catholic',
      'Islam',
      'Iglesia ni Cristo',
      'Aglipayan',
      'Mormon',
      'Muslim',
      'Buddhism',
      'Seventh-day Adventist',
      "Jehovah's Witnesses",
      'Dating Daan',
    ]);
    let politicalView = random(['Liberal', 'Conservative', 'Apolitical']);
    let drink = random([
      "I don't drink",
      'Moderate Drinker',
      'Heavy Drinker',
      'Low Tolerance',
    ]);
    let smoke = random([
      "I don't smoke",
      'I smoke',
      'No, but second hand smoke only',
      'Yes, but with vape only',
    ]);
    let wantKids = random([
      'No plans',
      'Maybe in the future',
      'Yes, I plan to',
    ]);
    let wantMarried = random([
      "I don't want to get married",
      'Religious Wedding',
      'Civil Wedding',
      'Formal Wedding',
      'Informal Wedding',
      'Destination Wedding',
      'Cruise Wedding',
      'Vintage Style Wedding',
    ]);
    let pets = random(
      [
        'Amphibians',
        'Birds',
        'Cats',
        'Dogs',
        'Ferrets',
        'Fish',
        'Guinea pigs',
        'Horses',
        'Rabbits',
        'Rats and mice',
        'Reptiles',
      ],
      5,
      11
    );
    let sports = random(
      [
        'Baseball',
        'Basketball',
        'Cricket',
        'Football',
        'Golf',
        'Gymnastics',
        'Hockey',
        'Martial Arts',
        'Swimming',
        'Table Tennis',
        'Tennis',
        'Volleyball',
      ],
      5,
      11
    );
    let Hobbies = random(
      [
        'Arts and Crafts',
        'Cooking',
        'Exercising',
        'Fishing',
        'Gaming',
        'Gardening',
        'Gardening',
        'Hiking',
        'Music',
        'Reading',
        'Traveling',
        'Watching',
        'Yoga',
      ],
      5,
      12
    );
    let musicGenre = random(
      [
        'Classical',
        'Woman playing violin classical music',
        'Country',
        'Electronic dance music (EDM)',
        'Hip-hop',
        'Indie rock',
        'Jazz',
        'J-pop',
        'K-pop',
        'Metal',
        'Oldies',
        'OPM',
        'Pop',
        'Rap',
        'Rhythm & blues (R&B)',
        'Rock',
        'Techno',
      ],
      5,
      16
    );
    let movieGenre = random(
      [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime and mystery',
        'Fantasy',
        'Historical',
        'Horror',
        'Romance',
        'Satire',
        'Science fiction',
        'Cyberpunk and derivatives',
        'Speculative',
        'Thriller',
        'Western',
      ],
      5,
      14
    );
    let books = random(
      [
        'Contemporary',
        'Dystopian',
        'Fantasy',
        'Manfa',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Thriller',
        'Westerns',
      ],
      5,
      8
    );
    let food = random(
      [
        'Street Foods',
        'Filipino Cuisine',
        'Korean Cuisine',
        'Chinese Cuisine',
        'Japanese Cuisine',
        'Fast Foods',
        'Pastry',
        'Pasta',
        'Milktea',
      ],
      5,
      8
    );

    let interest = await Interest.create({
      userId: user._id,
      maxDistance: faker.datatype.number({ max: 20000, min: 0 }),
      minDistance: 0,
      minAge: 18,
      maxAge: faker.datatype.number({ max: 30, min: 18 }),
      gender: random(['Men', 'Women', 'Everyone']),
      astrologicalSign,
      religion,
      politicalView,
      smoke,
      drink,
      wantKids,
      pets,
      sports,
      Hobbies,
      musicGenre,
      movieGenre,
      books,
      food,
    });

    await Evaluation.create({
      userId: user._id,
      interest: interest._id,
      questions,
      answers,
    });

    let currentId = user._id;
    for (let j = i + 1; j < users.length; j++) {
      // await Message.create({
      //   participantIds: [currentId, users[j]._id],
      //   body: 'a',
      //   senderId: currentId,
      // });
      // await Message.create({
      //   participantIds: [currentId, users[j]._id],
      //   body: 'b',
      //   senderId: users[j]._id,
      // });
      // await Message.create({
      //   participantIds: [currentId, users[j]._id],
      //   body: 'c',
      //   senderId: currentId,
      // });
      await Match.create({
        participants: [
          { isLike: false, userId: currentId },
          { isLike: false, userId: users[j]._id },
        ],
      });
    }
  }
};
