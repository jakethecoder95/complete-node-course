const fs = require('fs');

const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('Users Page');
    res.send(fs.readFileSync(`${__dirname}/users.html`, 'utf-8'));
});

app.use('/', (req, res, next) => {
    console.log('Home Page')
    res.send(fs.readFileSync(`${__dirname}/index.html`, 'utf-8'));
});

app.listen(3000);