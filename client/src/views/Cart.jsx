import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart 
} from '../store/modules/products.js';
import CartItem from '../components/CartItem.jsx';



const Checkout = ({createCart, addToCart, removeFromCart, cart, quantities}) => ( 
  <div>
    {cart.map((item, i) => {
      return <CartItem key={i} item={item} />;
    })}
    <div>Subtotal: ${
      cart.reduce((acc, curr) => {
        return acc + (Number(curr.price)) * quantities[curr.prod_id];
      }, 0)
    }
    </div>
    <button>Checkout</button>
  </div> 
);


const mapStateToProps = (state) => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);