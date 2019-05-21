const express = require('express');

const router = express.Router();

const team = {
    name: null,
    players: []
}

router.get('/edit', (req, res, next) => {
    res.render('edit', {
        path: '/edit',
        team: team,
        pageTitle: 'Edit Team', 
        teamPicked: false
    });
});

router.post('/', (req, res, next) => {
    team.name = req.body.teamName;
    team.players.push(req.body.player0);
    team.players.push(req.body.player1);
    team.players.push(req.body.player2);
    team.players.push(req.body.player3);
    team.players.push(req.body.player4);
    res.redirect('/');
})

exports.router = router;
exports.team = team;