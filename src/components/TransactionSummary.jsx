import React, {Component} from 'react';
import DetailedTransactionSummary from './DetailedTransactionSummary.jsx';
import ConciseTransactionSummary from './ConciseTransactionSummary.jsx';

class TransactionSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed: false
    };
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({
      detailed: !this.state.detailed
    });
  }

  render() {
    return (
      <div >
        {this.state.detailed ? 
          <DetailedTransactionSummary toggle={this.toggleDetails} transaction={this.props.transaction}/> :
          <ConciseTransactionSummary toggle={this.toggleDetails} transaction={this.props.transaction}/>
        }
      </div>
    );
  }
}

export default TransactionSummary;