const express = require('express');
const router = require('./routes/router');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = {
  path : '/',
  handler: app
};
