import React, {Component} from 'react';
import Subtotal from './Subtotal.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'sticky-kit/dist/sticky-kit.min.js';

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
    margin: '0 auto',
    border: '2px solid black',
    borderBottom: 'none'
  },
  title: {
    padding: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  text: {
    padding: '0px'
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
    overflowY: 'auto',
    height: '500px'
  },
  subTitle: {
    color: 'black'
  },
  subtotal: {
    border: '2px solid black',
    borderTop: 'none',
    padding: '2px'
  }
};

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

// const mapDispatchToProps = state => {
//   return bindActionCreators({}, dispatch);
// }

class CartWidget extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('props: ', this.props);
    return (
      <div id='cartWidget' style={style.root}>
        {this.props.cart.length ? 
          <GridList style={style.gridList}>
            <Paper style={style.paper}>
              <h2 style={style.header}>Cart</h2>
              <Grid style={style.grid} fluid>
                <Col xs={12}>
                  {this.props.cart ? this.props.cart.map((product, i) => {
                    return (
                      <div key={i}>
                        {i > 0 ? <hr/> : null}
                        <Row style={style.row} start="xs">
                          <Col style={style.imgHold} xs={4}>
                            <img style={style.img} src={product.imgs.small} alt="" />
                          </Col>
                          <Col xs={8}>
                            <CardTitle style={style.title} title={product.title}/>
                            <CardText style={style.text}>{product.description.slice(0, 25) + '...'}</CardText>
                          </Col>
                          <Row>
                            <Col style={style.priceCol}>
                              <CardText style={style.price}>
                                ${product.price.toFixed(12)}
                              </CardText>
                              <CardText style={style.delete}>
                                delete
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
                  <div style={{display: 'inline-block', float: 'right'}}>
                    Checkout!
                  </div>
                </div>
              </div>
            </Paper>
          </GridList> : false}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartWidget);