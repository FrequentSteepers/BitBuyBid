import React from 'react';
import {handleLogin} from '../store/modules/app.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  static fetchData(store) {
    return store;
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePassChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1><span className="fa fa-sign-in"></span>Login</h1>     

        <div className="form-group">
          <label>Email</label>
          <input onChange={this.handleEmailChange} type="text" className="form-control" name="email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input onChange={this.handlePassChange} type="password" className="form-control" name="password" />
        </div>

        <button onClick={() => { 
          this.props.handleLogin({email: this.state.email, password: this.state.password});
        }} 
        className="btn btn-warning btn-lg">Login</button>

        <p>Need to sign up for an account?</p>
        <Link to='/signup'>Sign up Page</ Link>
      </div>
    );
  }

}

const mapStateToProps = ({app}) => {
  return {
    user: app.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogin
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);