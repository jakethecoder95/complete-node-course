const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')

const editRoute = require('./routes/edit-team');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(editRoute);

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

app.use((req, res, next) => {
    res.status(404).send("<h1>404 ERROR: This is not the page you are looking for.</h1>");
})

app.listen(3000);