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