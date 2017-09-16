import axios from 'axios';

export const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const UPDATE_TRANSACTION_AMZN = 'transaction/UPDATE_TRANSACTION_AMZN';

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
  case UPDATE_TRANSACTION_AMZN:
    const activeTransaction = {... state.transactions[state.transactions.length - 1], ...payload};
    return {
      ...state,
      transactions: state.transactions.slice(0, -1).concat([activeTransaction])
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

export const checkout = (payload, dispatch) => {
  return (dispatch, getState) => {
    axios.post('/api/transactions', {
      cart: getState().products.cart, 
      quantities: getState().products.quantities
    })
      .then(res => {
        dispatch(
          {
            type: ADD_TRANSACTION,
            payload: res.data
          }
        );
      })
      .catch(err => console.log('error in the checkout: ', err));
  };
};

/**
 * @param {number} payload 
 */
export const handleAmazonCart = (payload) => {
  return (dispatch, getState) => {
    axios.post(`/api/transactions/${getState().transactions.transactions.slice(-1)[0].id}/amzn`, {})
      .then(response => {
        dispatch(
          {
            type: UPDATE_TRANSACTION_AMZN,
            payload: response.data
          }
        );
      })
      .catch(err => console.log('error in the checkout: ', err));
  };
};