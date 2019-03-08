import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
import {
    Container, Form,
    FormGroup, Row, Input
} from 'reactstrap';
import { select_flight } from '../actions'


const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductFlightAddToCart extends Component {

    state = {jmlh_passenger:{}}
    componentDidMount() {
        // var productId = this.props.match.params.id;
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var product_id = parseInt(params.productId)
        var username = params.username;
        var qty = parseInt(params.qty);
        console.log(product_id)
        axios.post( `http://localhost:1212/flight/getdetail`,{
            product_id
        })
        .then((res) => {
            console.log(res.data)
            this.props.select_flight({...res.data[0], username, qty})
            this.setState({jmlh_passenger:qty})
            console.log(this.state.jmlh_passenger)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnCheckOutClick = () => {
        if (this.state.jmlh_passenger === 1){
            if(window.confirm('Are you sure to Checkout?')){
                axios.post('http://localhost:1212/flight/isicart', {
                    username: this.props.product.username,
                    tanggal_pesan: new Date(),
                    flight_productId: this.props.product.id,
                    nama:  this.props.product.nama,
                    image:  this.props.product.image,
                    code:  this.props.product.code,
                    seat_class:  this.props.product.seat_class,
                    harga:  this.props.product.harga,
                    qty:  this.props.product.qty,
                    total_harga: (this.props.product.qty * this.props.product.harga),
                    tanggal: this.props.product.tanggal,
                    departure_city: this.props.product.departure_city,
                    departure_time: this.props.product.departure_time,
                    departure_terminal: this.props.product.departure_terminal,
                    arrival_city: this.props.product.arrival_city,
                    arrival_time: this.props.product.arrival_time,
                    arrival_terminal: this.props.product.arrival_terminal
                })
                .then((res) => {
                    console.log(res)
                    axios.post('http://localhost:1212/flight/addpassenger', {
                        id_pesanan: res.data[0].id,
                        passenger1: this.refs.passenger1.refs.tbpassenger1.value,
                        ktp1: this.refs.ktp1.refs.tbktp1.value
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Pesanan Anda berhasil dibuat! Silahkan upload bukti di keranjang belanja!')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        else if (this.state.jmlh_passenger === 2){
            if(window.confirm('Are you sure to Checkout?')){
                axios.post('http://localhost:1212/flight/isicart', {
                    username: this.props.product.username,
                    tanggal_pesan: new Date(),
                    flight_productId: this.props.product.id,
                    nama:  this.props.product.nama,
                    image:  this.props.product.image,
                    code:  this.props.product.code,
                    seat_class:  this.props.product.seat_class,
                    harga:  this.props.product.harga,
                    qty:  this.props.product.qty,
                    total_harga: (this.props.product.qty * this.props.product.harga),
                    tanggal: this.props.product.tanggal,
                    departure_city: this.props.product.departure_city,
                    departure_time: this.props.product.departure_time,
                    departure_terminal: this.props.product.departure_terminal,
                    arrival_city: this.props.product.arrival_city,
                    arrival_time: this.props.product.arrival_time,
                    arrival_terminal: this.props.product.arrival_terminal
                })
                .then((res) => {
                    console.log(res)
                    axios.post('http://localhost:1212/flight/addpassenger', {
                        id_pesanan: res.data[0].id,
                        passenger1: this.refs.passenger1.refs.tbpassenger1.value,
                        passenger2: this.refs.passenger2.refs.tbpassenger2.value,
                        ktp1: this.refs.ktp1.refs.tbktp1.value,
                        ktp2: this.refs.ktp2.refs.tbktp2.value
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Pesanan Anda berhasil dibuat! Silahkan upload bukti di keranjang belanja!')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        else if (this.state.jmlh_passenger === 3){
            if(window.confirm('Are you sure to Checkout?')){
                axios.post('http://localhost:1212/flight/isicart', {
                    username: this.props.product.username,
                    tanggal_pesan: new Date(),
                    flight_productId: this.props.product.id,
                    nama:  this.props.product.nama,
                    image:  this.props.product.image,
                    code:  this.props.product.code,
                    seat_class:  this.props.product.seat_class,
                    harga:  this.props.product.harga,
                    qty:  this.props.product.qty,
                    total_harga: (this.props.product.qty * this.props.product.harga),
                    tanggal: this.props.product.tanggal,
                    departure_city: this.props.product.departure_city,
                    departure_time: this.props.product.departure_time,
                    departure_terminal: this.props.product.departure_terminal,
                    arrival_city: this.props.product.arrival_city,
                    arrival_time: this.props.product.arrival_time,
                    arrival_terminal: this.props.product.arrival_terminal
                })
                .then((res) => {
                    console.log(res)
                    axios.post('http://localhost:1212/flight/addpassenger', {
                        id_pesanan: res.data[0].id,
                        passenger1: this.refs.passenger1.refs.tbpassenger1.value,
                        passenger2: this.refs.passenger2.refs.tbpassenger2.value,
                        passenger3: this.refs.passenger3.refs.tbpassenger3.value, 
                        ktp1: this.refs.ktp1.refs.tbktp1.value,
                        ktp2: this.refs.ktp2.refs.tbktp2.value,
                        ktp3: this.refs.ktp3.refs.tbktp3.value
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Pesanan Anda berhasil dibuat! Silahkan upload bukti di keranjang belanja!')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        else if (this.state.jmlh_passenger === 4){
            if(window.confirm('Are you sure to Checkout?')){
                axios.post('http://localhost:1212/flight/isicart', {
                    username: this.props.product.username,
                    tanggal_pesan: new Date(),
                    flight_productId: this.props.product.id,
                    nama:  this.props.product.nama,
                    image:  this.props.product.image,
                    code:  this.props.product.code,
                    seat_class:  this.props.product.seat_class,
                    harga:  this.props.product.harga,
                    qty:  this.props.product.qty,
                    total_harga: (this.props.product.qty * this.props.product.harga),
                    tanggal: this.props.product.tanggal,
                    departure_city: this.props.product.departure_city,
                    departure_time: this.props.product.departure_time,
                    departure_terminal: this.props.product.departure_terminal,
                    arrival_city: this.props.product.arrival_city,
                    arrival_time: this.props.product.arrival_time,
                    arrival_terminal: this.props.product.arrival_terminal
                })
                .then((res) => {
                    console.log(res)
                    axios.post('http://localhost:1212/flight/addpassenger', {
                        id_pesanan: res.data[0].id,
                        passenger1: this.refs.passenger1.refs.tbpassenger1.value,
                        passenger2: this.refs.passenger2.refs.tbpassenger2.value,
                        passenger3: this.refs.passenger3.refs.tbpassenger3.value,
                        passenger4: this.refs.passenger4.refs.tbpassenger4.value,
                        ktp1: this.refs.ktp1.refs.tbktp1.value,
                        ktp2: this.refs.ktp2.refs.tbktp2.value,
                        ktp3: this.refs.ktp3.refs.tbktp3.value,
                        ktp4: this.refs.ktp4.refs.tbktp4.value
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Pesanan Anda berhasil dibuat! Silahkan upload bukti di keranjang belanja!')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        else if (this.state.jmlh_passenger === 5){
            if(window.confirm('Are you sure to Checkout?')){
                axios.post('http://localhost:1212/flight/isicart', {
                    username: this.props.product.username,
                    tanggal_pesan: new Date(),
                    flight_productId: this.props.product.id,
                    nama:  this.props.product.nama,
                    image:  this.props.product.image,
                    code:  this.props.product.code,
                    seat_class:  this.props.product.seat_class,
                    harga:  this.props.product.harga,
                    qty:  this.props.product.qty,
                    total_harga: (this.props.product.qty * this.props.product.harga),
                    tanggal: this.props.product.tanggal,
                    departure_city: this.props.product.departure_city,
                    departure_time: this.props.product.departure_time,
                    departure_terminal: this.props.product.departure_terminal,
                    arrival_city: this.props.product.arrival_city,
                    arrival_time: this.props.product.arrival_time,
                    arrival_terminal: this.props.product.arrival_terminal
                })
                .then((res) => {
                    console.log(res)
                    axios.post('http://localhost:1212/flight/addpassenger', {
                        id_pesanan: res.data[0].id,
                        passenger1: this.refs.passenger1.refs.tbpassenger1.value,
                        passenger2: this.refs.passenger2.refs.tbpassenger2.value,
                        passenger3: this.refs.passenger3.refs.tbpassenger3.value,
                        passenger4: this.refs.passenger4.refs.tbpassenger4.value,
                        passenger5: this.refs.passenger5.refs.tbpassenger5.value,
                        ktp1: this.refs.ktp1.refs.tbktp1.value,
                        ktp2: this.refs.ktp2.refs.tbktp2.value,
                        ktp3: this.refs.ktp3.refs.tbktp3.value,
                        ktp4: this.refs.ktp4.refs.tbktp4.value,
                        ktp5: this.refs.ktp5.refs.tbktp5.value
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Pesanan Anda berhasil dibuat! Silahkan upload bukti di keranjang belanja!')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
    renderFormPassenger = () => {
        console.log(this.state.jmlh_passenger)
        if (this.state.jmlh_passenger === 1){
           return ( 
            <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
            <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Detail Penumpang: </h3>
            <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
            Nama: <Input type="text" name="passenger1" ref="passenger1" innerRef="tbpassenger1" placeholder="Nama Penumpang 1" style={{width:"200px"}}/>
            No. KTP: <Input type="text" name="ktp1" ref="ktp1" innerRef="tbktp1" placeholder="KTP Penumpang 1"  style={{width:"200px"}}/>
            </Row>
            </FormGroup>
        )}
        else if (this.state.jmlh_passenger === 2){
            return (
            <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
                <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Detail Penumpang: </h3>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger1" ref="passenger1" innerRef="tbpassenger1" placeholder="Nama Penumpang 1" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp1" ref="ktp1" innerRef="tbktp1" placeholder="KTP Penumpang 1"  style={{width:"200px"}}/>
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger2" ref="passenger2" innerRef="tbpassenger2" placeholder="Nama Penumpang 2" style={{width:"200px"}} />
                    No. KTP: <Input type="text" name="ktp2" ref="ktp2" innerRef="tbktp2" placeholder="KTP Penumpang 2" style={{width:"200px"}} />
                </Row>
            </FormGroup>
        )}
        else if (this.state.jmlh_passenger=== 3){
            return (
            <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
                <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Detail Penumpang: </h3>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger1" ref="passenger1" innerRef="tbpassenger1" placeholder="Nama Penumpang 1" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp1" ref="ktp1" innerRef="tbktp1" placeholder="KTP Penumpang 1"  style={{width:"200px"}}/>
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger2" ref="passenger2" innerRef="tbpassenger2" placeholder="Nama Penumpang 2" style={{width:"200px"}} />
                    No. KTP: <Input type="text" name="ktp2" ref="ktp2" innerRef="tbktp2" placeholder="KTP Penumpang 2" style={{width:"200px"}} />
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger3" ref="passenger3" innerRef="tbpassenger3" placeholder="Nama Penumpang 3" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp3" ref="ktp3" innerRef="tbktp3" placeholder="KTP Penumpang 3" style={{width:"200px"}} />
                    </Row>
            </FormGroup>
        )}
        else if (this.state.jmlh_passenger === 4){
            return (
            <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
                <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Detail Penumpang: </h3>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger1" ref="passenger1" innerRef="tbpassenger1" placeholder="Nama Penumpang 1" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp1" ref="ktp1" innerRef="tbktp1" placeholder="KTP Penumpang 1"  style={{width:"200px"}}/>
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger2" ref="passenger2" innerRef="tbpassenger2" placeholder="Nama Penumpang 2" style={{width:"200px"}} />
                    No. KTP: <Input type="text" name="ktp2" ref="ktp2" innerRef="tbktp2" placeholder="KTP Penumpang 2" style={{width:"200px"}} />
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger3" ref="passenger3" innerRef="tbpassenger3" placeholder="Nama Penumpang 3" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp3" ref="ktp3" innerRef="tbktp3" placeholder="KTP Penumpang 3" style={{width:"200px"}} />
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger4" ref="passenger4" innerRef="tbpassenger4" placeholder="Nama Penumpang 4" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp4" ref="ktp4" innerRef="tbktp4" placeholder="KTP Penumpang 4"  style={{width:"200px"}}/>
                </Row>
            </FormGroup>
        )}
        else if (this.state.jmlh_passenger=== 5){
            return (
            <FormGroup style={{height:"400px", width:"600px", paddingLeft:"10px"}}>
                <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Detail Penumpang: </h3>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger1" ref="passenger1" innerRef="tbpassenger1" placeholder="Nama Penumpang 1" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp1" ref="ktp1" innerRef="tbktp1" placeholder="KTP Penumpang 1"  style={{width:"200px"}}/>
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger2" ref="passenger2" innerRef="tbpassenger2" placeholder="Nama Penumpang 2" style={{width:"200px"}} />
                    No. KTP: <Input type="text" name="ktp2" ref="ktp2" innerRef="tbktp2" placeholder="KTP Penumpang 2" style={{width:"200px"}} />
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger3" ref="passenger3" innerRef="tbpassenger3" placeholder="Nama Penumpang 3" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp3" ref="ktp3" innerRef="tbktp3" placeholder="KTP Penumpang 3" style={{width:"200px"}} />
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger4" ref="passenger4" innerRef="tbpassenger4" placeholder="Nama Penumpang 4" style={{width:"200px"}}/>
                    No. KTP: <Input type="text" name="ktp4" ref="ktp4" innerRef="tbktp4" placeholder="KTP Penumpang 4"  style={{width:"200px"}}/>
                </Row>
                <Row style={{justifyContent:"space-between", paddingTop:"10px"}}>
                    Nama: <Input type="text" name="passenger5" ref="passenger5" innerRef="tbpassenger5" placeholder="Nama Penumpang 5" style={{width:"200px"}} />
                    No. KTP: <Input type="text" name="ktp5" ref="ktp5" innerRef="tbktp5" placeholder="KTP Penumpang 5"  style={{width:"200px"}}/>
                </Row>
            </FormGroup>
        )}
    }

    render(){
        var { image, nama, code, seat_class, tanggal,
            departure_city, departure_time, departure_terminal,
            arrival_city, arrival_time, arrival_terminal, description, harga, qty, username
        } = this.props.product
            return(
                <Container id="hero" className="wow fadeIn" style={{border: "3px solid light", backgroundColor:"#fff", width:"1200px", marginTop:"200px"}}>
                    <Form className="form">
                    <center><h2 style={{marginTop: "-100px", color:"#000", fontWeight:"bold"}}>Detail Pemesanan Tiket Pesawat Anda:</h2></center>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <FormGroup>
                            <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Pemesan: {username}</h3>
                        </FormGroup>
                    </FormGroup>
                    <Row style={{justifyContent: "space-around"}}>
                    <FormGroup className="col-lg-3">
                        <img src={`http://localhost:1212${image}`} alt={nama} style={{width:"100px"}}/>
                        <h3 style={{fontSize:"12px", color:"#000", fontWeight:"bold"}}>{nama}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", fontWeight:"bold"}}>{code}</h3>
                        <h3 style={{fontSize:"12px", color:"#000"}}>{seat_class}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"40px"}}>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{moment(tanggal).format('dddd, DD MMMM YYYY')}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{departure_time}</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>sampai</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{arrival_time}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"30px"}}>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", fontWeight:"bold"}}>dari:</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{departure_city} ({departure_terminal})</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left", fontWeight:"bold"}}>tujuan:</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{arrival_city} ({arrival_terminal})</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"-100px"}}>
                        <h3 style={{fontSize:"12px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Description</h3>
                        <h3 style={{fontSize:"12px", color:"#000", textAlign:"left"}}>{description}</h3>
                    </FormGroup>
                    </Row>
                    <FormGroup></FormGroup>
                    <FormGroup>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Jumlah Penumpang: {qty}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Harga/pax: {rupiah.format(harga)}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"center"}}>Total Pembayaran: {rupiah.format(qty*harga)}</h3>
                    </FormGroup>
                    {this.renderFormPassenger()}
                    <FormGroup style={{marginTop:-150}}>
                        <center><input type="button" className="btn btn-success" value="Check Out" style={{width:"200px"}} onClick={this.onBtnCheckOutClick}/></center>
                    </FormGroup>
                    </Form>
                </Container>
            );
    }
}

const mapStateToProps = (state) => {
    console.log(state.selectedFlight)
    return { 
        username: state.auth.username,
        product: state.selectedFlight,
    }
}

export default connect(mapStateToProps, { select_flight })(ProductFlightAddToCart);