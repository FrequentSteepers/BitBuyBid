import React, {Component} from 'react';
import {connect} from 'react-redux';

const style = {
  subtotal: {
    color: 'red'
  }
};

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

class Subtotal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={style.subtotal}>
        ${this.props.cart.reduce((acc, product) => {
          return acc += product.price * this.props.quantities[product.id];
        }, 0).toFixed(12)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Subtotal);