const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/edit-team', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'edit-team.html'));
});

router.post('/edit-team', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;

