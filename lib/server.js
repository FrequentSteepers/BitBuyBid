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

const server = express();
server.disable('x-powered-by');
server.use('/images', express.static(path.join(__dirname, '../src/assets/images')));
server.use('/scripts', express.static('built'));
server.use('/styles', express.static('lib'));
server.use('/built', express.static(path.join(__dirname, 'built')));
server.use('/built', express.static('built'));
server.use(express.static(path.join(__dirname, '../')));
server.get('/favicon.ico', (req, res) => res.send(''));

server.get('*', (req, res) => {
  const app = {
    user: 
    {
      id: 1,
      first: 'hello',
      last: 'world',
      username: 'hello from server'
    },
  };

  const store = configureStore({ app });

  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });

  return Promise.all(promises).then((data) => {
    let context = {};
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.send(renderFullHTMLPage(content, store.getState()));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('listening on ', PORT));
