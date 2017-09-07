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
      hello: payload
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
  console.log(user);
};
