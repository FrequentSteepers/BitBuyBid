import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Stripe extends Component {
  constructor(props) {
    super(props);
    
    
    this.onToken = (token) => {
      console.log('Stripe tx token: ', token);
      //here we can send the returned transaction token to the server and somehow mark the transaction as complete in the database
    };
  }

  render() {
    return (
      <div>
        {/*figure out all the parameters to specify for handling transactions in the way we want:*/}
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_5PUQTJpGR4ExQgfjhdOz2cw0"
          bitcoin={true}
          description="BitBuyz"
          image="https://i.imgur.com/wLGvMlJ.jpg"
        />
      </div>
    );
  }
}
export default Stripe;