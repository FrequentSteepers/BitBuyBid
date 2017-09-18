import React from 'react';
import {connect} from 'react-redux';
import {LineChart} from 'react-easy-chart';


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
