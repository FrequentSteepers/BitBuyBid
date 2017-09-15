import axios from 'axios';

export const ADD_TRANSACTION = 'transaction/ADD_TRANSACTION';
export const SET_TRANSACTIONS = 'app/SET_TRANSACTIONS';

const initialState = {
  transactions: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case ADD_TRANSACTION: 
    return {
      ...state,
      transactions: state.transactions.concat(Array.isArray(payload) ? payload : [payload])
    };
  case SET_TRANSACTIONS:
    return {
      ...state, 
      transactions: payload
    };
  default: return state;
  }
};

export const addTransaction = payload => (
  {
    type: ADD_TRANSACTION,
    payload
  }
);

export const setTransactions = payload => {
  return dispatch => {
    axios.get('/api/transactions')
      .then(transactions => {
        dispatch({
          type: SET_TRANSACTIONS,
          payload: transactions.data
        });
      })
      .catch(e => console.log('error getting transactions: ', e));
  };
};

/**
 * @param {number} payload 
 */
export const handleAmazonCart = (payload) => {
  return (dispatch, getState) => {
    axios.get(`/api/amzn/${payload}`)
      .then(res => console.log('successful checkout: ', res))
      .catch(err => console.log('error in the checkout: ', err));
  };
};