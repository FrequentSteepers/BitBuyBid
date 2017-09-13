import React, {Component} from 'react';

class DetailedTransactionSummary extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div onClick={() => this.props.toggle()}>
        detailed 
      </div>
    );
  }
}

export default DetailedTransactionSummary;