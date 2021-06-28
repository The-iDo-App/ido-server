const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        default: '',
    },
    facebookId: {
        type: String,
        default: '',
    },
    gmail: {
        type: String,
        default: '',
    },
    sex: {
        type: String,
        default: '',
    },
    orientation: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    showActiveStatus: {
        type: Boolean,
        default: true,
    },
    activeStatus: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online',
    },
    verificationStatus: {
        type: String,
        enum: ['verified', 'unverified', 'pending'],
        default: 'unverified',
    },
    address: {
        postalCode: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        province: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        latitude: {
            type: String,
            default: '',
        },
        longitude: {
            type: String,
            default: '',
        },
    },
    employment: {
        type: String,
        default: '',
    },
    blockedUsers: {
        type: [mongoose.Schema.Types.ObjectID],
        default: [],
        ref: 'User',
    },
    leftConversations: {
        type: [mongoose.Schema.Types.ObjectID],
        default: [],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;