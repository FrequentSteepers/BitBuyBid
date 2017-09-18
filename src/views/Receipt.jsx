import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleAmazonCart } from '../store/modules/transactions';

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.handleBitcoinBuy = this.handleBitcoinBuy.bind(this);
    this.amount = this.calculateLeftOver();
  }
  calculateLeftOver() {
    const total = this.props.cart.reduce((acc, curr) => 
      acc + (Number(curr.price)) * this.props.quantities[curr.prod_id]
      , 0).toFixed(2);
    return (Math.ceil(total) - total).toFixed(2);
  }

  handleBitcoinBuy(amount) {
    alert(`you have purchased %${(100 * amount / 4288.99).toFixed(8)} of a single bitcoin`);
  }

  render() {
    if (this.props.pendingTransaction && this.props.pendingTransaction['amzn_purchase_url']) {
      return (
        <div>
          <h2>Thank you!</h2>
          <h3>Your product should be shipping shortly.</h3>
          <button onClick={() => this.handleBitcoinBuy(this.amount)}>Get ${this.amount} worth of Bitcoins</button>
          {<a href={this.props.pendingTransaction['amzn_purchase_url']}>YOUR CART</a>}
        </div>
      );
    }
    return (
      <div>
        <h2>Thank you!</h2>
        <h3>Your product should be shipping shortly.</h3>
        <button onClick={() => this.handleBitcoinBuy(this.amount)}>Get ${this.amount} worth of Bitcoins</button>
        <RaisedButton 
          onClick={() => this.props.handleAmazonCart()}
          label="Create Amazon cart"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.products.cart,
  pendingTransaction: state.transactions.pendingTransaction,
  quantities: state.products.quantities
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    handleAmazonCart
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
