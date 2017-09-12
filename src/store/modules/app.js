import axios from 'axios';
import { push } from 'react-router-redux';

export const appTypes = {
  SET_USER: 'app/SET_USER',
  SET_TRANSACTIONS: 'app/SET_TRANSACTIONS'
};

const initialState = {
  user: null,
  transactions: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case appTypes.SET_USER: 
    return {
      ...state, 
      user: payload
    };
  case appTypes.SET_TRANSACTIONS:
    return {
      ...state, 
      transactions: payload
    };
  default: return state;
  }
};

export const setTransactions = payload => {
  return dispatch => {
    axios.get('/api/transactions')
      .then(transactions => {
        dispatch({
          type: appTypes.SET_TRANSACTIONS,
          transactions
        });
      })
      .catch(e => console.log('error getting transactions: ', e));
  };
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

export const handleLogout = () => {
  return (dispatch) => {
    axios.get('/auth/logout')
      .then(res => {
        console.log(res);
        dispatch({
          type: appTypes.SET_USER,
          payload: null
        });
      });
  };
};
