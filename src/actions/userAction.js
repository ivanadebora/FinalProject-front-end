import axios from 'axios';
import {
    GET_FLIGHT_LIST_SUCCESS,
    GET_FLIGHT_LIST_FAIL,
    SYSTEM_ERROR,
    SELECT_FLIGHT
} from './types'



export const select_flight = (selectedFlight) => {
    return ({
        type: SELECT_FLIGHT,
        payload: selectedFlight
    })     
}


export const onUserSearchFlight = ({
        departure_city, arrival_city, tanggal, qty, seat_class
    }) => {
        return (dispatch) => {
            axios.post('http://localhost:1212/flight/listsearch', {
                departure_city, arrival_city, tanggal, qty, seat_class
            })
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    dispatch({
                        type: GET_FLIGHT_LIST_SUCCESS,
                        payload: res.data
                    })
                }
                else if (res.data.length === 0) {
                    dispatch({
                        type: GET_FLIGHT_LIST_FAIL,
                        payload: 'Data cannot be found!'
                    })
                }
                else {
                    dispatch({
                        type: GET_FLIGHT_LIST_FAIL,
                        payload: 'Oops, sorry! An error occured. Please try Again!'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: SYSTEM_ERROR,
                    payload: 'System Error'
                })
            })
    }
}
