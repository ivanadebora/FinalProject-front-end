import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from '../actions/types'



const INITIAL_STATE = {username: '', role: '', status: '', error: '', loading: false, cookie: false};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, ...action.payload, cookie: true}
        case AUTH_SYSTEM_ERROR :
            return {...state, error: action.payload, cookie: true}
        case AUTH_LOADING :
            return {...INITIAL_STATE, loading: true, cookie: true}
        case LOGOUT :
            return {...INITIAL_STATE, cookie: true}
        case COOKIE_CHECKED :
            return {...state, cookie: true};
        default:
            return state;
    }
}