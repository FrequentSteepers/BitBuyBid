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
    'zIndex': 2,
    width: 200
  },
  paper: {
    position: 'relative',
    textAlign: 'center',
  }
};

const mapStateToProps = state => {
  return {
    cart: state.products.cart
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
    return (
      <div style={style.root}>
        <Paper style={style.paper}>
          <h2>Cart</h2>
          <Grid fluid>
            <Row >
              {this.props.cart ? this.props.cart.map((product, i) => {
                <Col key={i} xs={6} sm={6} md={4} lg={3}>
                  <div>Title: {this.props.title}</div>
                  <Card>
                    <CardHeader
                      title="URL Avatar"
                      subtitle="Subtitle"
                      avatar={`${product.imgs.small}`}
                    />
                    <CardMedia
                      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                    >
                      <img src={`${product.imgs.small}`} alt="" />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                  </Card>
                </Col>;
              }) : false}
            </Row>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartWidget);