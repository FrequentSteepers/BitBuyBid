import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './views/Home.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Hello, there!</h2>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          {/*<Route path='/profile' to={Profile}/>
          <Route path='/checkout' to={Checkout}/>*/}
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root'));