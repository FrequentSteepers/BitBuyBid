import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Stripe extends Component {
  constructor(props) {
    super(props);
    
    this.onToken = (token) => {
      console.log('token: ', token);
      //here we can do stuff with the returned transaction token
      //probably need to send to the server and somehow mark the
      //transaction as complete in the database
    };
  }

  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_5PUQTJpGR4ExQgfjhdOz2cw0"
          bitcoin={true}
        />
      </div>
    );
  }
}
export default Stripe;