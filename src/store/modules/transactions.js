import axios from 'axios';

export const ADD_TRANSACTION = 'transaction/ADD_TRANSACTION';

const initialState = {
  transactions: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case ADD_TRANSACTION: 
    return {
      ...state,
      transaction: transaction.concat(Array.isArray(payload) ? payload : [payload])
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