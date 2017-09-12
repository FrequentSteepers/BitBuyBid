import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../src/store/index.js';
import renderFullHTMLPage from '../renderFullHTMLPage';
import App from '../src/views/app.jsx';
import path from 'path';

import StaticRouter from 'react-router-dom/StaticRouter';

import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../src/routes.js';
import reducers from '../src/store/modules';

import middleware from './middleware';
import router from './routes/router.jsx';

global.navigator = { userAgent: 'all' };

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: true}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());


// app.use('/auth', routes.auth);
// app.use('/api', routes.api);
// app.use('/api/users', routes.users);
// app.use('/api/products', routes.products);
// app.use('/api/transactions', routes.transactions);
// app.use('/api/search', routes.search);

app.disable('x-powered-by');
app.use('/images', express.static(path.join(__dirname, '../src/assets/images')));
app.use('/scripts', express.static('built'));
app.use('/styles', express.static('lib'));
app.use('/built', express.static(path.join(__dirname, 'built')));
app.use('/built', express.static('built'));
app.use(express.static(path.join(__dirname, '../')));
app.get('/favicon.ico', (req, res) => res.send(''));

app.use('/*', router);

//if there is a carrot error, then that means that the file being 
//served is expected to be of another format, but is in HTML, 
//meaning that one of the routes meant to catch the request before 
//the catch all, which serves the HTML
// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/src/app.html'));
// });


module.exports = app;
