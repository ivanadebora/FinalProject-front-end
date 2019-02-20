import axios from 'axios';
import {
    GET_FLIGHT_LIST_SUCCESS,
    GET_FLIGHT_LIST_FAIL
} from './types'

export const onUserSearchFlight = (dispatch, departure_city,arrival_city,tanggal,jumlah_seat, seat_class) => {
    axios.post('http://localhost:1212/flight/listsearch', {
        departure_city,arrival_city,tanggal,jumlah_seat, seat_class
    })
    .then((res) => {
        if (res.data.length > 0) {
            dispatch ({
                type: GET_FLIGHT_LIST_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_FLIGHT_LIST_FAIL,
                payload: 'Data cannot be found!'
            })
        }
    })
}