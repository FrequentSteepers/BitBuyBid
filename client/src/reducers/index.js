import { combineReducers } from 'redux';
import Listing from './listingReducer';

const rootReducer = combineReducers({
  listings: Listing
});

export default rootReducer;
