import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => (
  {
    hello: state.app.hello
  }
);

const app = (props) => (
  <div>{props.hello} </div>
);

export default connect(mapStateToProps)(app);