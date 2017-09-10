import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart 
} from '../store/modules/products.js';
import Listing from '../components/Listing.jsx';
import Receipt from '../views/Receipt.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const Checkout = ({createCart, addToCart, removeFromCart, cart}) => (
  <BrowserRouter> 
    <div>
      {cart.map((item) => {
        return <Listing key={item.id} item={item} />;
      })}
      <div>Subtotal: {
        cart.reduce((acc, curr) => {
          return acc + curr.price;
        }, 0)
      }
      </div>
      <Switch>
        <Route exact path='/cart/confirm'>
          <div>
            <button><Link to='/receipt'>Confirm</Link></button>
            <button><Link to='/cart'>Abort</Link></button>
          </div>
        </Route>
        <Route path='/cart'>
          <button><Link to='/cart/confirm'>Checkout</Link></button>
        </Route>
        <Route path='/receipt'>
          <Receipt />
        </Route>
      </Switch>
    </div> 
  </BrowserRouter>
);


const mapStateToProps = (state) => {
  return {
    cart: state.products.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);