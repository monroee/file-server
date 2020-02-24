const express = require('express');
const fileRoute = express.Router();
const cache = require('./file.cache');

let File = require('./index');

fileRoute.route('/').get(cache.filesCache, (req, res) => {
    File.getFiles()
    .then((result) => {
        cache.client.setex("files", 60, JSON.stringify(result));
        res.json(result);
    })
});

module.exports = fileRoute;