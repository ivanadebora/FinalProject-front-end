import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_LOADING,
    LOGOUT
} from '../actions/types'



const INITIAL_STATE = {username: '', email: '', role: '', token: '', error: '', loading: false};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, ...action.payload};
        case AUTH_SYSTEM_ERROR :
            return {...INITIAL_STATE, error: action.payload};
        case AUTH_LOADING :
            return {...INITIAL_STATE, loading: true}
        case LOGOUT :
            return {...INITIAL_STATE, cookie:true}
        default:
            return state;
    }
}