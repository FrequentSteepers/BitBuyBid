import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setTransactions} from '../store/modules/app.js';

const mapStateToProps = state => {
  return {
    state: state.app.user.transactions
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
  }
  render() {
    this.props.setTransactions();
    console.log('props: ', this.props);
    return (
      <div>This will be the transactions!</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);