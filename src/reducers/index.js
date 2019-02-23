import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchListReducer from './searchListReducer'
import selectedFlightReducer from './selectedFlightReducer';


export default combineReducers({
    auth: authReducer,
    searchList: searchListReducer,
    selectedFlight: selectedFlightReducer
});