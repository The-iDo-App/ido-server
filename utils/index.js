const saveImage = require('./save.image');
const generateToken = require('./generate.token');
const {
  getDistance,
  getZodiacCompatibility,
  getInterestOneScore,
  getInterestTwoScore,
  getQuestionsScore,
} = require('./suggestion.helpers');

module.exports = {
  saveImage,
  generateToken,
  getDistance,
  getZodiacCompatibility,
  getInterestOneScore,
  getInterestTwoScore,
  getQuestionsScore,
};
