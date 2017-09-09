import axios from 'axios';

/**
 * Listings type
 */
export const SET_PRODUCTS = 'listings/SET_PRODUCTS';
export const SELECT_PRODUCT = 'listings/SELECT_PRODUCT';
export const CREATE_CART = 'products/CREATE_CART';
export const ADD_TO_CART = 'products/ADD_TO_CART';
export const REMOVE_FROM_CART = 'products/REMOVE_FROM_CART';

const initialState = {
  products: [],
  selectedId: null,
  cart: [],
  quantities: {}
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
  case SELECT_PRODUCT:
    return {
      ...state,
      selectedId: payload
    };
  case CREATE_CART:
    return {
      ...state,
      cart: payload || []
    };
  case ADD_TO_CART:
    let newQuantities = {...state.quantities};
    let newCart = state.cart.concat([payload]).filter((val, i, self) => self.indexOf(val) === i);
    [payload].map(product => {
      newQuantities[product.prod_id] = (state.quantities[product.prod_id] || 0) + 1;
    });
    return {
      ...state,
      cart: newCart,
      quantities: newQuantities
    };
  case REMOVE_FROM_CART:
    let newQuant = {...state.quantities};
    newQuant[payload.prod_id] = undefined;
    delete newQuant[payload.prod_id];
    return {
      ...state,
      cart: state.cart.filter((item)=>{
        return item !== payload;
      }),
      quantities: newQuant
    };
  default: return state;
  }
};

/**
 * Listings dispatchers
 */

export const setProducts = (searchTerm, dispatch) => {
  return (dispatch) => {
    axios.post('/api/search', {searchTerm: searchTerm})
      .then(products => {
        dispatch({
          type: SET_PRODUCTS,
          payload: products.data.results
        });
      })
      .catch(err => {
        console.log('error dispatching the products');
        throw err;
      });
  };
};

export const selectProduct = payload => {
  return {
    type: SELECT_PRODUCT,
    payload
  };
};

export const createCart = (payload) => {
  return {
    type: CREATE_CART,
    payload
  };
};

export const addToCart = (payload) => {

  return {
    type: ADD_TO_CART,
    payload
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload
  };
};
