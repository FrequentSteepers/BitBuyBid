import React from 'react';
import {connect} from 'react-redux';
import {LineChart} from 'react-easy-chart';


const BitExchangeChart = function ({exchanges}) {

  return (
    <div>
      <LineChart
        data={[
          exchanges.map((item) => {
            return {x: new Date(item.date).getTime(), y: Number(item.dollar_amt)};
          })
        ]}
      />
      <p>Bitcoin: ${exchanges[0].dollar_amt}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exchanges: state.exchange.btcExchange
  };
};

export default connect(mapStateToProps)(BitExchangeChart);