const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routeHome = require('./routes/home');
const routeEdit = require('./routes/edit')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routeHome);
app.use(routeEdit.router);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404 Error'})
}); 

app.listen(3000);