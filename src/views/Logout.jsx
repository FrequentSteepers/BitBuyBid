import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import handleLogout from '../store/modules/app.js';

const Logout = ({user, handleLogout}) => (
  <div>
    <h3>{`click to logout ${user.first}`}</h3>
    <button onClick={handleLogout.bind(this)}> Logout </button>
  </div>
);

const mapStateToProps = ({user}) => {
  return {
    user: user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogout
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);