import React from 'react';
import {handleLogin} from '../store/modules/app.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="col-sm-6 col-sm-offset-3">
      <h1><span className="fa fa-sign-in"></span>Login</h1>

      <form onSubmit={handleLogin}>

        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>

        <button type="submit" className="btn btn-warning btn-lg">Login</button>

      </form>

      <p>Need to sign up for an account?</p>
      <Link to='/signup'>Sign up Page</ Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  // return {
  //   term: state.search.term
  // };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogin
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);