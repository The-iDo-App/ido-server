module.exports = (app) => {
  app.use('/api/profiles', require('./profile.router'));
  app.use('/api/settings', require('./setting.router'));
  app.use('/api/suggestions', require('./suggestion.router'));
};
