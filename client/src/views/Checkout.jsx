import React from 'react';
import { connect } from 'react-redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart 
} from '../store/modules/products.js';
import Listing from '../components/Listing';



const Checkout = ({createCart, addToCart, removeFromCart, cart}) => ( 
  <div>
    {cart.map((item) => {
      return <Listing key={item.id} item={item} />;
    })}
    <div>Subtotal</div>
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