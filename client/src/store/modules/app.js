import axios from 'axios';
import { push } from 'react-router-redux';

export const appTypes = {
  SET_USER: 'app/SET_USER'
};

const initialState = {
  user: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case appTypes.SET_USER: 
    return {
      ...state, 
      user: payload
    };
  default: return state;
  }
};

export const setUser = payload => {
  return {
    type: appTypes.SET_USER,
    payload
  };
};

export const handleLogin = (user) => {
  return (dispatch) => {
    
    axios.post('/auth/login', user)
      .then((results) => {
        console.log(results.data);
        dispatch({
          type: appTypes.SET_USER,
          payload: results.data
        });
        //figure out redirect
        dispatch(push('/'));
      })
      .catch((err) => {
        alert('Incorrect user information or user does not exist');
        console.log(err);
      });
  };
};

export const handleSignup = (user) => {
  return (dispatch) => {
    axios.post('/auth/signup', user)
      .then((results) => {
        console.log(results);
      })
      .catch(console.error);
  };
};
