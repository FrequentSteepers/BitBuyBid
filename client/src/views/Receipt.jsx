import React, {Component} from 'react';

const Receipt = ({amount}) => (
  <div>
    <h2>Thank you!</h2>
    <h3>Your product should be shipping shortly.</h3>
    <button onClick={() => handleBitcoinBuy(amount)}>Get ${amount} worth of Bitcoins</button>
    <button>Return to cart</button>
  </div>
);

const handleBitcoinBuy = amount => {
  alert(`you have purchased %${(100 * amount / 4288.99).toFixed(8)} of a single bitcoin`);
};

export default Receipt;
