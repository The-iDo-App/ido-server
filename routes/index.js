module.exports = (app) => {
  app.use('/api/profiles', require('./profile.router'));
  app.use('/api/settings', require('./setting.router'));
};
