import {combineReducers} from 'redux';
import app from './app';
import listing from './listings';
import search from './search';

export default combineReducers({app, search, listing});