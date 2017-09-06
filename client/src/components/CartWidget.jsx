import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';

const style = {
  paper: {
    width: 200,
    float: 'right',
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
      <div>
        <Paper style={style.paper}>
          <h2>Cart</h2>
          <Col>
            {this.props.cart.length ? this.props.cart.map((product, i) => {
              <Row key={i} xs={12} sm={12} md={12} lg={12}>
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
              </Row>;
            }) : null}
          </Col>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartWidget);