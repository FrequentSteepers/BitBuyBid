import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../store/modules/products.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const Listing = ({item, addToCart}) => {
  return (
    <div>
      <Card>
        <div>
          {item.title}<br/>
          <Link to={`/product?id=${item.id}`}><img src={item.img_url_sm}/></Link>
          Rating: {item.rating}
          <button onClick={ () => { addToCart(item); } }>Add to Cart!</button>
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
  return bindActionCreators({addToCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
