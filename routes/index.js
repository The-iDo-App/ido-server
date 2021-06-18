module.exports = (app) => {
    app.use('/api/profiles', require('./profile.router'));
    app.use('/api/logins', require('./login.router'));
    app.use('/api/registers', require('./register.router'));
};