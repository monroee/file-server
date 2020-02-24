const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const fileRoute = require('./app/file/file.route');
const ip = require('ip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/frontend-ng')));
app.use('/', express.static(path.join(__dirname, 'dist/frontend-ng')));
app.use('/api', fileRoute);

const port = process.env.PORT || 2606;
const server = app.listen(port, () => {
    console.log(`Server connected on ${ip.address()}:${port}`);
})

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function(err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});