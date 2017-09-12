import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index.js';
import App from './views/app.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const store = configureStore(window.__PRELOADED_STATE__, window);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
