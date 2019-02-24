import { 
    SELECT_FLIGHT
   } from '../actions/types'

const INITIAL_STATE = {
    id: 0, 
    code: '', 
    nama: '', 
    image: '',
    tanggal: '', 
    departure_city:'',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    departure_terminal: '',
    arrival_terminal: '',
    seat_class: '',
    harga: 0, 
    description: '',
    qty:0,
    username:''
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_FLIGHT :
            return {...state, ...action.payload}; 
        default:
            return state;
    }
}