import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    Container, Form,
    FormGroup, Row
} from 'reactstrap';
import FooterTID from './FooterTID';


const cookie = new Cookies();
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductFlightTicket extends Component {

    state = {listHistory: {}, listPassenger: {}}
    
    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var id = parseInt(params.ticket_id)
        var username = params.username;
        axios.post('http://localhost:1212/flight/listhistorydetail', {
            username, id
        })
        .then((res) => {
            axios.post('http://localhost:1212/flight/listpassengerhistory', {
                id
            })
            .then((res1) => {
                console.log(res.data)
                console.log(res1.data)
                this.setState({listHistory:res.data[0], listPassenger:res1.data[0]})
            })
        })
        .catch((err) => {
          console.log(err)
      })
    }

    render(){
        var {username, image_maskapai, nama, code, seat_class, tanggal, qty, harga, total_harga, tanggal_pesan, status_transaksi,
                departure_city, departure_terminal, departure_time, 
                arrival_city, arrival_terminal, arrival_time} = this.state.listHistory
        var { passenger1, passenger2, passenger3, passenger4, passenger5, 
                ktp1, ktp2, ktp3, ktp4, ktp5 } = this.state.listPassenger
        var newUser = cookie.get('dataUser')
        if (newUser !== undefined) {
            return(
                <div>
                <Container id="hero" className="wow fadeIn" style={{border: "3px solid light", backgroundColor:"#fff", width:"1200px", marginTop:"200px"}}>
                    <Form className="form">
                    <center><h2 style={{marginTop: "-100px", color:"#000", fontWeight:"bold"}}>Detail Pemesanan Tiket Pesawat Anda:</h2></center>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <FormGroup>
                            <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Pemesan: {username}</h3>
                            <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Tanggal Pemesanan: {moment(tanggal_pesan).format('Do MMMM YYYY, h:mm:ss')}</h3>
                            <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Status: {status_transaksi}</h3>
                        </FormGroup>
                    </FormGroup>
                    <Row style={{justifyContent: "space-around"}}>
                    <FormGroup className="col-lg-4">
                        <img src={`http://localhost:1212${image_maskapai}`} alt={nama} style={{width:"100px"}}/>
                        <h3 style={{fontSize:"12px", color:"#000", fontWeight:"bold"}}>{nama}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", fontWeight:"bold"}}>{code}</h3>
                        <h3 style={{fontSize:"12px", color:"#000"}}>{seat_class}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-4" style={{marginTop:"10px", paddingLeft:"40px"}}>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{moment(tanggal).format('dddd, DD MMMM YYYY')}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{departure_time}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>sampai</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{arrival_time}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-4" style={{marginTop:"10px", paddingLeft:"30px"}}>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", fontWeight:"bold"}}>dari:</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{departure_city} ({departure_terminal})</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", fontWeight:"bold"}}>tujuan:</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{arrival_city} ({arrival_terminal})</h3>
                    </FormGroup>
                    </Row>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Jumlah Penumpang: {qty}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Harga/pax: {rupiah.format(harga)}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Total Pembayaran: {rupiah.format(total_harga)}</h3>
                    </FormGroup>
                    <FormGroup>
                    <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
                    <h3 style={{fontSize:"16px", fontWeight:"bold", color:"#000", textAlign:"left"}}>Detail Penumpang: </h3>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{passenger1} {ktp1}</h3>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{passenger2} {ktp2}</h3>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{passenger3} {ktp3}</h3>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{passenger4} {ktp4}</h3>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{passenger5} {ktp5}</h3>
                    </FormGroup>
                    </FormGroup>
                    </Form>
                </Container>
                <FooterTID />
                </div>
            );
        }
        else {
            return <Redirect to="/" />
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state.auth.username)
    return {
        username: state.auth.username
    }
}


export default connect(mapStateToProps)(ProductFlightTicket);