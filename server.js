"use strict";

/* Serveur pour le site de recettes */
let express = require('express');
let mustache = require('mustache-express');

let model = require('./model');
let app = express();

// parse form arguments in POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// setup session handler
const cookieSession = require('cookie-session');
app.use(cookieSession({
    secret: 'mot-de-passe-du-cookie',
}));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static('views'));
// middleware qui teste si l'utilisateur est authentifié
function is_authenticated(req, res, next) {
    if (req.session.user !== undefined) {
        return next();
    }
    res.status(401).send('Authentication required');
}

// middleware qui ajoute deux variables de session aux templates : authenticated et le nom de l'utilisateur
app.use(function(req, res, next) {
    if (req.session.user !== undefined) {
        res.locals.authenticated = true;
        res.locals.name = req.session.name;
    }
    return next();
});

app.post('/login', (req, res) => {
    const user = model.login(req.body.user, req.body.password);
    if (user !== -1) {
        req.session.user = user;
        req.session.name = req.body.user;
        res.redirect('/home');
    } else {
        res.redirect('/new_user');
    }
});

app.post('/new_user', (req, res) => {
    const user = model.new_user(req.body.user, req.body.password);
    if (user !== -1) {
        req.session.user = user;
        req.session.name = req.body.user;
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/new_user', (req, res) => {
    res.render('new_user');
});

/**** Routes pour voir les pages du site ****/

/* Retourne une page principale */
app.get('/', (req, res) => {
    res.render('login');
});

app.listen(8000, () => console.log('Server OPEN ! http://localhost:8000'));
