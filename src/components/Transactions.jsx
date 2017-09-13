import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setTransactions} from '../store/modules/app.js';
import TransactionSummary from './TransactionSummary.jsx';

const mapStateToProps = state => {
  return {
    transactions: state.app.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setTransactions
  }, dispatch);
};

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.props.setTransactions();
  }
  render() {
    return (
      <div>
        {this.props.transactions ? 
          this.props.transactions.data.map((transaction, i) => {
            return (
              <TransactionSummary transaction={transaction} key={i}/>
            );
          }) : 
          null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);