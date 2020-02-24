const express = require('express');
const app = express();
const fileRoute = express.Router();

let File = require('./index');

fileRoute.route('/').get((req, res) => {
    File.getFiles()
    .then((result) => {
        res.json(result);
    })
});

module.exports = fileRoute;