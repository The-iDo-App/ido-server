module.exports = (app) => {
    app.use('/api/profiles', require('./profile.router'));
    app.use('/api/settings', require('./setting.router'));
    app.use('/api/suggestions', require('./suggestion.router'));
    app.use('/api/registers', require('./registration.router'));
    app.use('/api/avatars', require('./avatar.router'));
    app.use('/api/logins', require('./login.router'));
    app.use('/api/questions', require('./question.router'));
    app.use('/api/evaluations', require('./evaluation.router'));

};