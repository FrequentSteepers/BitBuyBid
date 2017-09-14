import {combineReducers} from 'redux';
import app from './app';
import products from './products';
import search from './search';
import exchange from './exchange';

export default combineReducers({app, search, products, exchange});