import React, {Component} from 'react';
import {connect} from 'react-redux';

const style = {
  subtotal: {
    color: 'red'
  }
};

const mapStateToProps = state => {
  return {
    cart: (state.products.cart.length ? state.products.cart : state.transactions.pendingTransaction.cart ? state.transactions.pendingTransaction.cart : []),
    quantities: state.products.quantities,
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
          return product.price ? 
            acc += Number(product.price) * this.props.quantities[product.prod_id] : 
            acc;
        }, 0).toFixed(2)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Subtotal);