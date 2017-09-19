import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart,
} from '../store/modules/products.js';
import {checkout} from '../store/modules/transactions.js';
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
          <Switch>
            <Route exact path='/cart/confirm'>
              <div>
                Subtotal: <Subtotal />
                <Link to='/receipt' onClick={() => this.props.checkout()}><FlatButton label="Confirm"/></Link>
                <Link to='/cart'><FlatButton label="Abort"/></Link>
              </div>
            </Route>
            <Route path='/cart'>
              <div>
                Subtotal: <Subtotal />
                {this.props.cart.length !== 0 && <Link to='/cart/confirm'><FlatButton label="Checkout"/></Link>}
              </div>
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