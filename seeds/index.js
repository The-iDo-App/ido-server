require('dotenv').config();
const seed = async () => {
  try {
    await require('../startup/db')();

    await require('./user.seed')(100);
    // await require('./avatar.seed')();
    await require('./question.seed')();
    await require('./test.seed')();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seed();
