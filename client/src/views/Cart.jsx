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
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  /**
   * Calculate the total amount to charge for the items in cart (pre tax)
   */
  calculateTotal() {
    return this.props.cart.reduce((acc, curr) => 
      acc + (Number(curr.price)) * this.props.quantities[curr.prod_id]
      , 0).toFixed(2);
  }
  
  /**
   * Calculate the amount of bitcoins to buy after rounding up. 
   */
  calculateLeftOver() {
    const total = this.props.cart.reduce((acc, curr) => 
      acc + (Number(curr.price)) * this.props.quantities[curr.prod_id]
      , 0).toFixed(2);
    return (Math.ceil(total) - total).toFixed(2);
  }

  render() {
    return (
      <BrowserRouter> 
        <div>
          {this.props.cart.map((item, i) => {
            return <CartItem key={i} item={item} />;
          })}
          <div>Subtotal: ${this.calculateTotal()}
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
              <Receipt amount={this.calculateLeftOver()} />
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