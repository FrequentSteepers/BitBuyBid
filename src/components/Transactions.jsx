import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setTransactions} from '../store/modules/app.js';
import DetailedTransactionSummary from './DetailedTransactionSummary.jsx';
import ConciseTransactionSummary from './ConciseTransactionSummary.jsx';
import Transaction from './Transaction.jsx';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

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
          (this.props.transactions.data.map((transaction, i) => 
            (<Card style={{padding: '15px', margin: '4px'}}>
              <Transaction key={i} transaction={transaction}/>
            </Card>))
          ) : 
          null}
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);