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

const style = {
  root: {
    position: 'fixed',
    top: '10%',
    right: '5%',
    float: 'right',
    zIndex: 2,
    paddingTop: '10px'
  },
  paper: {
    width: '250px'
  },
  header: {
    textAlign: 'center',
    padding: '0px',
    border: '2px solid black',
    borderBottom: 'none'
  },
  title: {
    padding: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  text: {
    padding: '0px',
    fontStyle: 'italic'
  },
  grid: {
    border: '2px solid black',
    padding: '0px',
    paddingTop: '5px'
  },
  img: {
    position: 'relative',
    width: '100%'
  },
  imgHold: {
    padding: '0px',
    margin: '0 auto'
  },
  price: {
    color: 'seagreen',
    float: 'left'
  },
  priceCol: {
    display: 'inline-block'
  },
  delete: {
    display: 'inline-block',
    float: 'right',
    color: 'maroon',
  },
  gridList: {
    overflowY: 'auto'
  },
  subTitle: {
    color: 'black'
  },
  subtotal: {
    border: '2px solid black',
    borderTop: 'none',
    padding: '2px'
  },
  link: {
    textDecoration: 'none'
  },
  expand: {
    float: 'right', 
    position: 'fixed', 
    top: '10%', 
    right: '5%'
  }
};

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({selectProduct}, dispatch);
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
      <div id='cartWidget' style={style.root}>
        {this.props.cart.length ? 
          <GridList style={style.gridList}>
            <Paper style={style.paper}>
              <div style={style.header}>
                <div style={{display: 'inline-block'}}>Cart</div>
                <button style={{position: 'realtive', display: 'inline-block', float: 'right'}} type='button' onClick={() => this.setState({display: false})}>collapse</button>
              </div>
              <Grid style={style.grid} fluid>
                <Col xs={12}>
                  {this.props.cart ? this.props.cart.map((product, i) => {
                    return (
                      <div key={i}>
                        {i > 0 ? <hr/> : null}
                        <Row onClick={() => this.props.selectProduct(product.id)} style={style.row} start="xs">
                          <Col style={style.imgHold} xs={4}>
                            <Link style={style.link} to={`/product?id=${product.id}`}>  
                              <img style={style.img} src={product.img_url_sm} alt="" />
                            </Link>
                          </Col>
                          <Col xs={8}>
                            <Link style={style.link} to={`/product?id=${product.id}`}>  
                              <CardTitle style={style.title} title={product.title}/>
                            </Link>
                            <CardText style={style.text}>{product.description.slice(0, 40) + '...'}</CardText>
                          </Col>
                          <Row>
                            <Col style={style.priceCol}>
                              <CardText style={style.price}>
                                ${product.price ? Number(product.price).toFixed(6) : null}
                              </CardText>
                              <CardText style={style.delete}>
                                delete&nbsp;&nbsp;&nbsp;quantity:{this.props.quantities[product.id]}
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
              </div>
            </Paper>
          </GridList> : false}
      </div> : <button style={style.expand} type='button' onClick={() => this.setState({display: true})}>expand</button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);