import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserHistory, Route, Switch, Link } from 'react-router';
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
          <Route exact path='/home' to={Home}/>
          <Route path='/profile' to={Profile}/>
          <Route path='/checkout' to={Checkout}/>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserHistory>
    <App />
  </BrowserHistory>, 
  document.getElementById('root'));
