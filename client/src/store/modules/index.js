import {combineReducers} from 'redux';
import app from './app';
import products from './products';
import search from './search';
import profile from './profile';

export default combineReducers({app, search, products, profile});