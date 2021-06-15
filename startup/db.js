const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
};
