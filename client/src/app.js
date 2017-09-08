import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './views/Home.jsx';
import { setHello, appTypes } from './store/modules/app.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Nav from './components/Nav.js';
import Product from './views/Product.jsx';
import Cart from './views/Cart.jsx';
import Recipt from './views/Recipt.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
    the default route should always be last, as the interpreter
    will render the first route that returns positive in the switch 
    block as matching the path endpoint. therefor, the '/' will render
    no matter what the chartacters after the URI are, serving as a 
    kind of catch-all. 
  */

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route path='/product'> 
            <Product />
          </Route>
          <Route path='/recipt'>
            <Recipt />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({
      theme: lightBaseTheme,
      AppBar: {
        position: 'relative',
        padding: 0,
        left: 0
      }
    })}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root'));