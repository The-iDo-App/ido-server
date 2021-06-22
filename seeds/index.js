require('dotenv').config();
const seed = async () => {
  try {
    await require('../startup/db')();

    await require('./user.seed')();
    await require('./avatar.seed')();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seed();
