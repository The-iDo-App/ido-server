module.exports = (app) => {
  app.use('/api/profiles', require('./profile.router'));
};
