import axios from 'axios';

/**
 * Listings type
 */
export const SET_PRODUCTS = 'listings/SET_PRODUCTS';
export const SELECT_PRODUCT = 'listings/SELECT_PRODUCT';

const initialState = {
  products: [],
  selectedId: null
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
  default: return state;
  }
};

/**
 * Listings dispatchers
 */

//  const fetchProducts = () => {
//   axios.get('/api/products')
//     .then((results) => {
//       let button = $('button');
//       console.log('data: ', results.data.results);
//       button[1].hidden = true;
//       props.setProducts(results.data.results);
//     });
// };

export const setProducts = (dispatch) => {
  return (dispatch) => {
    axios.get('/api/products')
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