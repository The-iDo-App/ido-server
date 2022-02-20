const mongoose = require('mongoose');

const picture = {
    originalImage: {
        type: String,
        // required: true,
    },
    blurredImage: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        // required: true,
    }
};

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        require: true,
    },
    shortDescription: {
        type: String,
        default: '',
    },
    datingStatus: {
        type: String,
        default: '',
    },
    picture,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;