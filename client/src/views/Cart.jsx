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
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';

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
          <div>Subtotal: {
            this.props.cart.reduce((acc, curr) => {
              return acc + (Number(curr.price)) * quantities[curr.prod_id];
            }, 0)
          }
          </div>
          <Switch>
            <Route exact path='/cart/confirm'>
              <div>
                <Link to='/receipt' onClick={() => this.props.checkout()}><button>Confirm</button></Link>
                <Link to='/cart'><button>Abort</button></Link>
              </div>
            </Route>
            <Route path='/cart'>
              <Link to='/cart/confirm'><button>Checkout</button></Link>
            </Route>
            <Route path='/receipt'>
              <Receipt />
            </Route>
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart, checkout}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);