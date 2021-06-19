const { JWT_SECRET, PORT } = process.env;
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
const { google } = require('googleapis');
const request = require('request');
const cors = require('cors');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');
const { APIS } = require('googleapis/build/src/apis');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//GET http://localhost:5000/api/logins/g/googleauthh to receive login code
exports.googleSign = async(req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        '740301413940-8gbnaf68k46bhdua32mqvj0o59bfm5qb.apps.googleusercontent.com',
        'yo_MbqDOV7GO1JzgmexOqb-k',
        'http://localhost:5000/api/logins/g'
    );
    const scopes = [
        'https://www.googleapis.com/auth/user.gender.read',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/user.emails.read',

    ]
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid
        })

    });

    request(url, (err, response, body) => {
        console.log("error: " + err);
        console.log("status code: " + response && response.statusCode);
        res.send({ url });
    });

}

exports.getCode = async(req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;

    const oauth2Client = new google.auth.OAuth2(
        '740301413940-8gbnaf68k46bhdua32mqvj0o59bfm5qb.apps.googleusercontent.com',
        'yo_MbqDOV7GO1JzgmexOqb-k',
        'http://localhost:5000/api/logins/g'
    );

    const tokens = await oauth2Client.getToken(code);
    try {
        const result = await axios.get('https://people.googleapis.com/v1/people/me', {
            headers: {
                'Authorization': "Bearer " + tokens.tokens.access_token
            },
            'Content-Type': "application/json",
            params: {
                // resourceName: 'people/me',
                personFields: 'genders,birthdays,addresses,emailAddresses,names'
            }
        }).then((response) => {
            console.log(response.data);
        });
    } catch (e) {
        console.log(e);
    }
}

exports.post = async(req, res) => {
    const user = {
        user_id: 1,
        username: 'testing',
        email: 'test@gmail.com',
    }
    jwt.sign({ user: user }, JWT_SECRET, (err, access_token) => {
        // localStorage.setItem('access_token', access_token);
        return res.json({
            access_token: 'Bearer ' + access_token,
        });
    });
}