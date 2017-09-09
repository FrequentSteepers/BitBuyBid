import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, removeFromCart} from '../store/modules/products.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const CartItem = ({item, addToCart, removeFromCart, quantities}) => {
  return (
    <div>
      <Card>
        <div>
          <h4>{item.title}</h4> <br/>
          <Link to={`/product?id=${item.id}`}><img src={item.img_url_sm}/></Link>
          <button onClick={ () => { addToCart(item); } }>+</button>
          <button onClick={ () => { console.log('decriment'); } }>-</button><br/>
          <button onClick={ () => { removeFromCart(item); } }>Remove from Cart</button><br/>
          <p>Quantity: {quantities[item.prod_id] || quantities[item.id]}</p>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addToCart, removeFromCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);