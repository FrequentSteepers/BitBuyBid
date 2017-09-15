import React, {Component} from 'react';
import Subtotal from './Subtotal.jsx';
import { Link } from 'react-router-dom';
import {selectProduct, addToCart, removeFromCart, decrementItem} from '../store/modules/products.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {style} from '../styles.js';

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectProduct,
      decrementItem,
      addToCart,
      removeFromCart
    }, dispatch);
};

class CartWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
  }

  render() {
    return (this.state.display ? 
      <div style={style.root}>
        {this.props.cart.length ? 
          <GridList style={style.gridList}>
            <Paper style={style.paper}>
              <div style={style.header}>
                <div style={style.cart}>Cart</div>
                <button style={style.collapse} type='button' onClick={() => this.setState({display: false})}>collapse</button>
              </div>
              {this.props.cart ? this.props.cart.map((product, i) => {
                return (
                  <div onClick={() => this.props.selectProduct(product.id)} key={i}>
                    {i > 0 ? <hr/> : null}
                    <Link style={style.link} to={`/product?id=${product.id}`}>
                      <img style={style.img} src={product.img_url_sm} alt="" />
                    </Link>
                    <Link style={style.link} to={`/product?id=${product.id}`}>

                      <CardTitle style={style.title} title={product.title}/>
                    </Link>
                    <CardText style={style.text}>{product.description.slice(0, 40) + '...'}</CardText>
                    <CardText style={style.price}>
                            ${product.price ? Number(product.price).toFixed(2) : 0}
                    </CardText>
                    <CardText style={style.delete}>
                            delete&nbsp;&nbsp;&nbsp;quantity:{this.props.quantities[product.prod_id] || this.props.quantities[product.id]}
                    </CardText>
                  </div>
                );
              }) : false}
              <div style={style.subtotal}>
                <div style={style.subTitle}>
                  <b><i>Subtotal:</i></b>
                  <Subtotal/>
                </div>
                <div>
                  <Link to='/cart'><button>Checkout</button></Link>
                </div>
              </div>
            </Paper>
          </GridList> : false}
      </div> : <button style={style.expand} type='button' onClick={() => this.setState({display: true})}>expand</button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);
