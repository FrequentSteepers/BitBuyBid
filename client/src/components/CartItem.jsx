import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, removeFromCart} from '../store/modules/products.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const CartItem = ({item, addToCart, removeFromCart}) => {
  return (
    <div>
      <Card>
        <div>
          <h4>{item.title}</h4> <br/>
          <Link to={`/product?id=${item.id}`}><img src={item.img_url_sm}/></Link>
          <button onClick={ () => { addToCart(item); } }>+</button>
          <button onClick={ () => { console.log('decriment quantity'); } }>-</button><br/>
          <p>Quantity: {}</p>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.products.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addToCart, removeFromCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);