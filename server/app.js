'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());


app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/users', routes.users);
app.use('/api/products', routes.products);

app.get('*/app.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/dist/bundle.js'));
});


//if there is a carrot error, then that means that the file being 
//served is expected to be of another format, but is in HTML, 
//meaning that one of the routes meant to catch the request before 
//the catch all, which serves the HTML
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/src/app.html'));
});


module.exports = app;
