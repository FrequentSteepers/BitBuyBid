import express from 'express';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import path from 'path';
import axios from 'axios';

import configureStore from '../../src/store/index.js';
import renderFullHTMLPage from '../../renderFullHTMLPage';
import App from '../../src/views/app.jsx';

import StaticRouter from 'react-router-dom/StaticRouter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import routes from '../../src/routes.js';
import middleware from '../middleware';
import { matchRoutes, renderRoutes } from 'react-router-config';

// import appRouter from '../../src/router';

// const reqRoutes = createRoutes(appRouter());


const router = express.Router();
var BTC_EXCHANGE = {btcExchange: undefined};  
axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
  .then((data) => {
    BTC_EXCHANGE.btcExchange = data.data.data.amount;    
  });

/**
 * Render the component and return the given 
 */
router.get('/', (req, res) => {

  const app = {
    user: req.isAuthenticated() ? req.user : null, 
  };

  const exchange = {
    btcExchange: BTC_EXCHANGE.btcExchange
  };

  const store = configureStore({ app, exchange });

  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
  });

  return Promise.all(promises).then((data) => {
    let context = {};
    const content = renderToString(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme({
          theme: lightBaseTheme,
          AppBar: {
            position: 'relative',
            padding: 0,
            left: 0
          },
          userAgent: req.headers['user-agent']
        })}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    res.send(renderFullHTMLPage(content, store.getState(), req.headers['user-agent']));
  });
});

export default router;