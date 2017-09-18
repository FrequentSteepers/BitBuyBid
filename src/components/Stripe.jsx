import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Stripe extends Component {
  constructor(props) {
    super(props);
    
    this.onToken = (token) => {
      console.log('token: ', token);
      // fetch('/save-stripe-token', {
      //   method: 'POST',
      //   body: JSON.stringify(token),
      // }).then(response => {
      //   response.json().then(data => {
      //     alert(`We are in business, ${data.email}`);
      //   });
      // });
    };
  }

  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_5PUQTJpGR4ExQgfjhdOz2cw0"
        />
      </div>
    );
  }
}
export default Stripe;