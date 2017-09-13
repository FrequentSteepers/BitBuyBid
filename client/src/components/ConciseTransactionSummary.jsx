import React, {Component} from 'react';

class ConciseTransactionSummary extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onClick={() => this.props.toggle()}>
        concise: {this.props.transaction.buyer.username}
      </div>
    );
  }
}

export default ConciseTransactionSummary;