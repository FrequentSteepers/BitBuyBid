import React, {Component} from 'react';
import Subtotal from './Subtotal.jsx';
import { Link } from 'react-router-dom';
import {selectProduct} from '../store/modules/products.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {style} from '../styles.js';
import {decrementItem} from '../store/modules/products.js';

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
      decrementItem
    }, dispatch);
};

class CartWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
    this.decrementItem = this.props.decrementItem.bind(this);
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
              <Grid style={style.grid} fluid>
                <Col xs={12}>
                  {this.props.cart ? this.props.cart.map((product, i) => {
                    return (
                      <div key={i}>
                        {i > 0 ? <hr/> : null}
                        <Row onClick={() => this.props.selectProduct(i)} style={style.row} start="xs">
                          <Col style={style.imgHold} xs={4}>
                            <Link style={style.link} to={`/product?id=${product.prod_id}`}>
                              <img style={style.img} src={product.img_url_sm} alt="" />
                            </Link>
                          </Col>
                          <Col xs={8}>
                            <Link style={style.link} to={`/product?id=${product.prod_id}`}>
                              <CardTitle style={style.title} title={product.title}/>
                            </Link>
                            <CardText style={style.text}>{product.description.slice(0, 40) + '...'}</CardText>
                          </Col>
                          <Row>
                            <Col style={style.priceCol}>
                              <CardText style={style.price}>
                                ${product.price ? Number(product.price).toFixed(2) : 0}
                              </CardText>
                              <CardText style={style.delete}>
                                <button onClick={() => this.decrementItem(product)}>delete</button>&nbsp;&nbsp;&nbsp;quantity:{this.props.quantities[product.prod_id] || this.props.quantities[product.id]}
                              </CardText>
                            </Col>
                          </Row>
                        </Row>
                      </div>
                    );
                  }) : false}
                </Col>
              </Grid>
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
