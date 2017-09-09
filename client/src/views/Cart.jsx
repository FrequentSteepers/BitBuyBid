import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart 
} from '../store/modules/products.js';
import CartItem from '../components/CartItem.jsx';



const Checkout = ({createCart, addToCart, removeFromCart, cart}) => ( 
  <div>
    {cart.map((item, i) => {
      return <CartItem key={i} item={item} />;
    })}
    <div>Subtotal: {
      cart.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0)
    }
    </div>
    <button>Checkout</button>
  </div> 
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