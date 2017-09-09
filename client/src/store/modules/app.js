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
        dispatch({
          type: appTypes.SET_USER,
          payload: results.data
        });
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
      .then(({data}) => {
        if (data && data.first) {
          dispatch(
            {
              type: appTypes.SET_USER,
              payload: data 
            }
          );
          alert(`you are logged in as ${data.first}!`);
        } else {
          alert('signup failed!');
        }
      })
      .catch(console.error);
  };
};
