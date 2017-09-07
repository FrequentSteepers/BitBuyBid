import React from 'react';
import {Link} from 'react-router-dom';

const Signup = (props) => {
  return (
    <div className="col-sm-6 col-sm-offset-3">
      <h1><span className="fa fa-sign-in"></span>Sign up</h1>

      <form action="/signup" method="post">

        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>

        <button type="submit" className="btn btn-warning btn-lg">Sign up</button>

      </form>

      <p>Already have an account?</p> 
      <Link to='/login'>Login Page</ Link> 
    </div>
  );
};
export default Signup;