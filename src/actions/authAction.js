import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from './types'



export const onUserRegister = ({
    username,
    email,
    phone,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOADING
        })
        if (username === '' || email === '' || phone === '' || password === '') {
            dispatch({
                type: AUTH_SYSTEM_ERROR,
                payload: 'Semua form di atas wajib diisi!'
            })
        } 
        else {
            axios.post('http://localhost:1212/auth/register', {
                username, email, phone, password
            })
            .then((res) => {
                console.log(res);
                if(res.data.status === 'error'){
                    dispatch({
                        type: AUTH_SYSTEM_ERROR,
                        payload: res.data.message
                    })
                }
                else {
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: res.data
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: AUTH_SYSTEM_ERROR,
                    payload: 'System Error'
                })
            })
        }
    }
}


export const onUserVerified = (userData) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: userData
    }
}

export const onUserLogout = () => {
    return {
        type: LOGOUT
    }
}

export const onUserLogin = ({
        username,
        password
    }) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOADING
        })
        loginStart(dispatch, username, password);
    }
}

var loginStart = (dispatch, username, password) => {
    axios.post('http://localhost:1212/auth/login', {
                username,
                password
        })
    .then((res) => {
        // console.log(res)
        console.log(res.data)
        if (res.data.length > 0) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data[0]
            })
        } else {
            dispatch({
                type: AUTH_SYSTEM_ERROR,
                payload: 'Username or password invalid'
            })
        }
    })
    .catch((err) => {
        console.log(err)
        dispatch({
            type: AUTH_SYSTEM_ERROR,
            payload: 'System Error'
        })
    })
}

export const keepLogin = (username) => {
    return (dispatch) => {
        axios.post('http://localhost:1212/auth/keeplogin', {
                username
        })
        .then((res) => {
            if (res.data.length > 0) {
                dispatch ({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        username: res.data[0].username, 
                        status: res.data[0].status, 
                        role: res.data[0].role }
                })
            }
        })
    }
}

export const cookieChecked = () => {
    return {
        type: COOKIE_CHECKED
    }
}