import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';

const initialState = window.__PRELOADED_STATE__ || {};
const enhancers = [];
const middleware = [thunk];

const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(
  applyMiddleware(...middleware), 
  ...enhancers
);

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
);