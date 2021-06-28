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

  let questions = await Question.find().limit(10);
  let temp = questions;
  questions = questions.map((question) => question._id);

  let users = await User.find();
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let answers = temp.map((question) => random(question.choices));
    let astrologicalSign = random([
      'aries',
      'taurus',
      'gemini',
      'cancer',
      'leo',
      'virgo',
      'libra',
      'scorpio',
      'sagittarius',
      'capricorn',
      'aquarius',
      'pisces',
    ]);
    let religion = random([
      'no religion',
      'roman catholic',
      'islam',
      'other christian',
      'tribal religion',
      'others',
      'protestant',
    ]);
    let politicalView = random([
      'liberalism',
      'conservatism',
      'socialism',
      'social democracy',
      'communism',
      'fascism',
      'feminism',
    ]);
    let drinks = random([
      'milk',
      'coffee',
      'chocolate',
      'tea',
      'mixed fruit',
      'juice',
      'energy drink',
      'soft drinks',
      'beer',
      'wine',
      'others',
    ]);
    let smoke = random([
      "I don't smoke",
      'Sometimes',
      'Cigarettes',
      'Light and Menthol Cigarettes',
      'E-cigarettes',
    ]);
    let wantKids = random([
      'might be interested in having children',
      'interested in having children',
      'not interested in having children',
      'want to adopt a child',
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
      1,
      3
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
      1,
      3
    );
    let hobbies = random(
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
      1,
      3
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
      1,
      3
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
      1,
      3
    );
    let books = random(
      [
        'Mystery',
        'Science fiction',
        'Historical Fiction',
        'Literary Fiction',
        'Young Adult Fiction',
        'Horror Fiction',
        'Children’s literature',
        'Short story',
        'Thriller',
        'Memoir',
        'Fantasy',
        'Fairy tale',
        'Suspense',
        'Prose',
        'Adventure Fiction',
        'Drama',
        'Detective Novel',
        'Paranormal Romance',
        'Romance Novel',
        'Historical Romance',
        'Graphic Novel',
        'Philosophy',
        'Crime Novel',
        'True Crime',
        'Mythology',
        'History',
        'Folklore',
      ],
      1,
      3
    );
    let food = random(
      [
        'Street foods',
        'Lumpiang Shanghai',
        'Pansit',
        'Pizza',
        'Kare-Kare',
        'Chicken Adobo',
        'Pasta',
        'Hamburger',
        'Soup',
        'Bread',
        'Milk Tea',
        'Halo-halo',
        'Silog',
        'Lechon',
        'Sinigang',
      ],
      1,
      3
    );

    let interest = await Interest.create({
      userId: user._id,
      maxDistance: 90,
      minDistance: 10,
      minAge: 10,
      maxAge: 90,
      genderPref: faker.lorem.word(),
      astrologicalSign,
      religion,
      politicalView,
      drinks,
      smoke,
      wantKids,
      wantMarried,
      pets,
      sports,
      hobbies,
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
          { isLike: false, userId: currentId },
          { isLike: false, userId: users[j]._id },
        ],
      });
    }
  }
};
