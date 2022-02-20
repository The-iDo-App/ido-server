const getZodiacCompatibility = (sign1, sign2) => {
  let compatibilities = [
    // ARIES
    { pair: ['aries', 'leo'], rating: 12 },
    { pair: ['aries', 'sagittarius'], rating: 11 },
    { pair: ['aries', 'libra'], rating: 10 },
    { pair: ['aries', 'gemini'], rating: 9 },
    { pair: ['aries', 'aquarius'], rating: 8 },
    { pair: ['aries', 'pisces'], rating: 7 },
    { pair: ['aries', 'virgo'], rating: 6 },
    { pair: ['aries', 'aries'], rating: 5 },
    { pair: ['aries', 'scorpio'], rating: 4 },
    { pair: ['aries', 'capricorn'], rating: 3 },
    { pair: ['aries', 'cancer'], rating: 2 },
    { pair: ['aries', 'taurus'], rating: 1 },

    // TAURUS
    { pair: ['taurus', 'capricorn'], rating: 12 },
    { pair: ['taurus', 'cancer'], rating: 11 },
    { pair: ['taurus', 'virgo'], rating: 10 },
    { pair: ['taurus', 'scorpio'], rating: 9 },
    { pair: ['taurus', 'pisces'], rating: 8 },
    { pair: ['taurus', 'leo'], rating: 7 },
    { pair: ['taurus', 'taurus'], rating: 6 },
    { pair: ['taurus', 'libra'], rating: 5 },
    { pair: ['taurus', 'aquarius'], rating: 4 },
    { pair: ['taurus', 'gemini'], rating: 2 },
    { pair: ['taurus', 'sagittarius'], rating: 1 },

    // GEMINI
    { pair: ['gemini', 'libra'], rating: 12 },
    { pair: ['gemini', 'leo'], rating: 11 },
    { pair: ['gemini', 'aquarius'], rating: 10 },
    { pair: ['gemini', 'virgo'], rating: 8 },
    { pair: ['gemini', 'capricorn'], rating: 7 },
    { pair: ['gemini', 'cancer'], rating: 6 },
    { pair: ['gemini', 'gemini'], rating: 5 },
    { pair: ['gemini', 'sagittarius'], rating: 4 },
    { pair: ['gemini', 'pisces'], rating: 3 },
    { pair: ['gemini', 'scorpio'], rating: 1 },

    // CANCER
    { pair: ['cancer', 'pisces'], rating: 12 },
    { pair: ['cancer', 'scorpio'], rating: 10 },
    { pair: ['cancer', 'virgo'], rating: 9 },
    { pair: ['cancer', 'capricorn'], rating: 8 },
    { pair: ['cancer', 'cancer'], rating: 7 },
    { pair: ['cancer', 'sagittarius'], rating: 5 },
    { pair: ['cancer', 'libra'], rating: 4 },
    { pair: ['cancer', 'leo'], rating: 2 },
    { pair: ['cancer', 'aquarius'], rating: 1 },

    // LEO
    { pair: ['leo', 'libra'], rating: 11 },
    { pair: ['leo', 'sagittarius'], rating: 10 },
    { pair: ['leo', 'aquarius'], rating: 7 },
    { pair: ['leo', 'scorpio'], rating: 6 },
    { pair: ['leo', 'leo'], rating: 5 },
    { pair: ['leo', 'pisces'], rating: 4 },
    { pair: ['leo', 'virgo'], rating: 2 },
    { pair: ['leo', 'capricorn'], rating: 1 },

    // VIRGO
    { pair: ['virgo', 'capricorn'], rating: 12 },
    { pair: ['virgo', 'scorpio'], rating: 9 },
    { pair: ['virgo', 'pisces'], rating: 8 },
    { pair: ['virgo', 'libra'], rating: 6 },
    { pair: ['virgo', 'virgo'], rating: 5 },
    { pair: ['virgo', 'sagittarius'], rating: 3 },
    { pair: ['virgo', 'aquarius'], rating: 1 },

    // LIBRA
    { pair: ['libra', 'aquarius'], rating: 10 },
    { pair: ['libra', 'pisces'], rating: 9 },
    { pair: ['libra', 'libra'], rating: 7 },
    { pair: ['libra', 'sagittarius'], rating: 6 },
    { pair: ['libra', 'capricorn'], rating: 3 },
    { pair: ['libra', 'scorpio'], rating: 1 },

    // SCORPIO
    { pair: ['scorpio', 'pisces'], rating: 12 },
    { pair: ['scorpio', 'capricorn'], rating: 11 },
    { pair: ['scorpio', 'scorpio'], rating: 7 },
    { pair: ['scorpio', 'aquarius'], rating: 6 },
    { pair: ['scorpio', 'sagittarius'], rating: 2 },

    // SAGITTARIUS
    { pair: ['sagittarius', 'aquarius'], rating: 10 },
    { pair: ['sagittarius', 'pisces'], rating: 8 },
    { pair: ['sagittarius', 'capricorn'], rating: 6 },
    { pair: ['sagittarius', 'sagittarius'], rating: 3 },

    // CAPRICORN
    { pair: ['capricorn', 'pisces'], rating: 9 },
    { pair: ['capricorn', 'capricorn'], rating: 7 },
    { pair: ['capricorn', 'aquarius'], rating: 5 },

    // AQUARIUS
    { pair: ['aquarius', 'aquarius'], rating: 4 },
    { pair: ['aquarius', 'pisces'], rating: 3 },

    // PISCES
    { pair: ['pisces', 'pisces'], rating: 4 },
  ];

  let rating = 0;
  compatibilities.map((compatibility) => {
    let arr1 = JSON.stringify(compatibility.pair.sort());
    let arr2 = JSON.stringify([sign1, sign2].sort());
    if (arr1 === arr2) rating = compatibility.rating;
  });

  return rating;
};

const getInterestOneScore = (user1, user2) => {
  let interest1 = user1.evaluation.interest;
  let interest2 = user2.evaluation.interest;
  let zodiacCompatibilityScore = getZodiacCompatibility(
    interest1.astrologicalSign,
    interest2.astrologicalSign
  );
  let religionScore = interest1.religion === interest2.religion ? 7 : 0;
  let politicalViewScore =
    interest1.politicalView === interest2.politicalView ? 7 : 0;
  let smokeScore = interest1.smoke === interest2.smoke ? 5 : 0;
  let wantKidsScore = interest1.wantKids === interest2.wantKids ? 4 : 0;
  let wantMarriedScore =
    interest1.wantMarried === interest2.wantMarried ? 8 : 0;

  let score =
    zodiacCompatibilityScore +
    religionScore +
    politicalViewScore +
    smokeScore +
    wantKidsScore +
    wantMarriedScore;

  return (score / 43) * 100;
};

const getInterestTwoScore = (user1, user2) => {
  let interest1 = user1.evaluation.interest;
  let interest2 = user2.evaluation.interest;
  let fields = [
    'sports',
    'Hobbies',
    'musicGenre',
    'movieGenre',
    'pets',
    'books',
    'food',
    'drink',
  ];

  let score = 0;
  for (let i = 0; i < fields.length; i++) {
    let combined = interest1[fields[i]].concat(interest2[fields[i]]);
    score += combined.length - [...new Set(combined)].length;
  }

  // console.log(score);
  return score;
};

const getQuestionsScore = (user1, user2) => {
  let evaluation1 = user1.evaluation;
  let evaluation2 = user2.evaluation;
  let all = {};

  // assuming na same questions
  evaluation1.questions.map((el, i) => {
    console.log(i, evaluation2.answers[i]);
    all[el] = [evaluation1.answers[i]];
  });
  evaluation2.questions.map((el, i) => {
    console.log(i, evaluation2.answers[i]);
    all[el].push(evaluation2.answers[i]);
  });

  let score = 0;
  evaluation1.questions.map((el, i) => {
    if ([...new Set(all[el])].length === 1) {
      score++;
    }
  });
  return score;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

module.exports = {
  getDistance,
  getZodiacCompatibility,
  getInterestOneScore,
  getInterestTwoScore,
  getQuestionsScore,
};
