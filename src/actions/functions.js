import {
    CONVERT_DATE,
    CONVERT_RUPIAH
} from './types'

export const dateConverter = (date) => {
    return (dispatch) => {
        var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            dispatch({type: CONVERT_DATE});
            return [year, month, day].join('-');
    }
};

export const rupiahConverter = (angka) => {
    return (dispatch) => {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) {
            if (i%3 === 0) {
                rupiah += angkarev.substr(i,3)+'.';
            }
        }
        dispatch({type: CONVERT_RUPIAH});
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
};