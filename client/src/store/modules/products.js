/**
 * Listings type
 */
export const SET_PRODUCTS = 'listings/SET_PRODUCTS';

const initialState = {
  products: []
};
/**
 * Listings reducer function
 */
export default (state = initialState, {type, payload}) => {
  switch (type) {
  case SET_PRODUCTS:
    return {
      ...state,
      products: payload
    };
  default: return state;
  }
};

/**
 * Listings dispatchers
 */
export const setProducts = (payload) => {
  return {
    type: SET_PRODUCTS,
    payload
  };
};