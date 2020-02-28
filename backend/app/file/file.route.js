const express = require('express');
const fileRoute = express.Router();
const cache = require('./file.cache');
const path = require('path');

let File = require('./index');

fileRoute.route('/').get(cache.filesCache, (req, res) => {
    File.getFiles()
    .then((result) => {
        cache.client.setex("files", 1800, JSON.stringify(result));
        res.json(result);
    })
});

fileRoute.route('/download').get( (req, res) => {
    const file = path.resolve(req.query.full_path);
    res.download(file);
})

fileRoute.route('/test').get( (req, res) => {
    res.json('TEST ROUTE');
});

module.exports = fileRoute;