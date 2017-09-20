import React from 'react';
import {connect} from 'react-redux';
import {LineChart} from 'react-easy-chart';


const BitRateChart = function ({exchanges}) {  
  return (
    <div>
      <LineChart
        data={[
          exchanges.map((item) => {
            return item ? {x: new Date(item.date).getTime(), y: Number(item.dollar_amt)} : null;
          })
        ]}
      />
      <p>Bitcoin: ${exchanges[0] ? exchanges[0].dollar_amt : null}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exchanges: state.exchange.btcExchange
  };
};

export default connect(mapStateToProps)(BitRateChart);