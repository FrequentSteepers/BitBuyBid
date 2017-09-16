import React from 'react';
import {connect} from 'react-redux';

const BitExchangeChart = function (props) {
  return (
    <div>
      <p>{props.exchanges[0].dollar_amt}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exchanges: state.exchange.btcExchange
  };
};

export default connect(mapStateToProps)(BitExchangeChart);
