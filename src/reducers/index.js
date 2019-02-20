import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchListReducer from './searchListReducer'


export default combineReducers({
    auth: authReducer,
    searchList: searchListReducer
});