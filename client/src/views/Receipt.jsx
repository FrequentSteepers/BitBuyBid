import React, {Component} from 'react';

class Receipt extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Thank you!</h2>
        <h3>Your product should be shipping shortly.</h3>
      </div>
    );
  }
}

export default Receipt;
