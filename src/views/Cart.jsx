import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart,
  checkout
} from '../store/modules/products.js';
import Listing from '../components/Listing.jsx';
import Receipt from '../views/Receipt.jsx';
import CartItem from '../components/CartItem.jsx';
import Subtotal from '../components/Subtotal.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter> 
        <div>
          {this.props.cart.map((item, i) => {
            return <CartItem key={i} item={item} />;
          })}
          <div>Subtotal: <Subtotal />
          </div>
          <Switch>
            <Route exact path='/cart/confirm'>
              <div>
                <Link to='/receipt' onClick={() => this.props.checkout()}><FlatButton label="checkout"/></Link>
                <Link to='/cart'><FlatButton label="Abort"/></Link>
              </div>
            </Route>
            <Route path='/cart'>
              <Link to='/cart/confirm'><FlatButton label="Checkout"/></Link>
            </Route>
            <Route path='/receipt'>
              <Receipt/>
            </Route>
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => 
  ({
    cart: state.products.cart,
    quantities: state.products.quantities
  });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart, checkout}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);