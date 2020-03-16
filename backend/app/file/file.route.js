const express = require('express');
const fileRoute = express.Router();
const cache = require('./file.cache');
const path = require('path');
const fs = require('fs');
const ms = require('mediaserver');

let File = require('./index');

fileRoute.route('/').get(cache.filesCache, (req, res) => {
    File.getFiles()
        .then((result) => {
            cache.client.setex("files", 1800, JSON.stringify(result));
            res.json(result);
        })
});

fileRoute.route('/download').get((req, res) => {
    const file = path.resolve(req.query.full_path);
    res.download(file);
})

fileRoute.route('/about').get((req, res) => {
    const about = `
    The purpose of this application is to easily
    share my files (e.g. Music, Videos (if you know what i mean. >;D ), Documents and some other files) 
    with my friends and relatives via local network and server as my laptop.
    
    Browsing with their phones, tablets or laptops where they can download and play the files.
    Sharing is caring! huehuehue
    `;

    res.send(about);
});

fileRoute.route('/setting').get((req, res) => {
    const settings = `
    This page is not yet implemented.
    Im so sorry... huhuhuhuhuhu... :'(
    `;

    res.send(settings);
});

fileRoute.route('/stream').get((req, res) => {
    let file = path.resolve(req.query.full_path);
    let stat = fs.statSync(file);
    let total = stat.size;

    if (req.headers.range) {
        let range = req.headers.range;
        let parts = range.replace(/bytes=/, "").split("-");
        let partialStart = parts[0];
        let partialEnd = parts[1];

        let start = parseInt(partialStart, 10);
        let end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
        let chunkSize = (end - start) + 1;
        let readStream = fs.createReadStream(file, {
            start: start,
            end: end
        });
        res.writeHead(206, {
            'Content-Range': `bytes ${start} - ${end} / ${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        });
        readStream.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': total,
            'Content-Type': 'audio/mpeg'
        });
        fs.createReadStream(file).pipe(res);
    }
});

fileRoute.route('/test').get((req, res) => {
    res.send('yezzir!');
});

fileRoute.route('/audiotest').get((req, res) => {
    let sample_audio = "C:/Users/Monroe/Music/Locals/Long Bond Yellow Papers/Release/LBYP - Maala-Ala Mo Kaya.mp3";
    ms.pipe(req, res, sample_audio);
});

module.exports = fileRoute;