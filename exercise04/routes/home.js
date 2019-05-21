const express = require('express');

const edit = require('./edit');

const router = express.Router();

router.get('/', (req, res, next) => {
    const team = edit.team;
    res.render('home', {
        path: '/',
        team: team,
        pageTitle: 'Home'
    });
});

module.exports = router;