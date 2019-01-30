import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_LOADING,
    LOGOUT
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

export const keepLogin = (username) => {
    return (dispatch) => {
        axios.get('http://localhost:2018/users', {
            params: {
                username
            }
        })
        .then((res) => {
            if (res.data.length > 0) {
                dispatch ({
                    type: USER_LOGIN_SUCCESS,
                    payload: {email: res.data[0].email, username}
                })
            }
        })
    }
}