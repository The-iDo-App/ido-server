const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;