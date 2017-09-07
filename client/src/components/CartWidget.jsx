import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';

const style = {
  root: {
    position: 'fixed',
    top: '10%',
    right: '5%',
    zIndex: 2,
  },
  paper: {
    border: '2px solid black',
    width: '250px'
  },
  header: {
    textAlign: 'center',
    margin: '0 auto'
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
    border: '2px solid black'
  }
};

const mapStateToProps = state => {
  return {
    cart: state.products.cart
  };
};

// will be using this dispatch once the listings are connected to 
// increment/decrement/remove functionality:
// const mapDispatchToProps = state => {
//   return bindActionCreators({}, dispatch);
// }

class CartWidget extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={style.root}>
        {this.props.cart.length ? <Paper style={style.paper}>
          <h2 style={style.header}>Cart</h2>
          <Grid style={style.grid} fluid>
            <Col xs={12}>
              {this.props.cart ? this.props.cart.map((product, i) => {
                return (
                  <div key={i}>
                    <Row style={style.row} start="xs">
                      <Col xs={4}>
                        <CardMedia>
                          <img src={`${product.imgs.small}`} alt="" />
                        </CardMedia>
                      </Col>
                      <Col xs={8}>
                        <CardTitle style={style.title} title={`${product.title}`}/>
                        <CardText style={style.text}>This is where the description of the product will go! :D</CardText>
                      </Col>
                    </Row>
                  </div>
                );
              }) : false}
            </Col>
          </Grid>
        </Paper> : false}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartWidget);