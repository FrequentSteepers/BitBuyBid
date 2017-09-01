export const SET_HELLO = 'app/SET_HELLO';


const initialState = {
  hello: 'world'
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case SET_HELLO: 
    return state.hello = payload;
  default: return state;
  }
};

export const setHello = payload => {
  return {
    type: SET_HELLO,
    payload
  };
};