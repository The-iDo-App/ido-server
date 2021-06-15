module.exports = (app) => {
  app.use('/api/profile', require('./profile.router'));
};
