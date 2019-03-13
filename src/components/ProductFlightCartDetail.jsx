import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import axios from 'axios';
import moment from 'moment';
import {
    Container, Form,
    FormGroup, Row, Input
} from 'reactstrap';
import FooterTID from './FooterTID';


const cookie = new Cookies();
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class ProductFlightCartDetail extends Component {

    state = {listCart: {}, listPassenger: {}, UploadBukti:'Pilih Gambar'}
    
    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var id = parseInt(params.order_id)
        var username = params.username;
        console.log(id)
        axios.post('http://localhost:1212/flight/lihatcartdetail', {
            username, id
        })
        .then((res) => {
            axios.post('http://localhost:1212/flight/listpassengercart', {
                id
            })
            .then((res1) => {
                console.log(res.data)
                console.log(res1.data)
                this.setState({listCart:res.data[0], listPassenger:res1.data[0]})
            })
        })
        .catch((err) => {
          console.log(err)
      })
    }

    onFileChange = () => {
        if(document.getElementById("UploadBukti").files[0] !== undefined) {
          this.setState({UploadBukti: document.getElementById("UploadBukti").files[0].name})
        }
        else {
          this.setState({UploadBukti: 'Pilih Gambar'})
        }
      }

    onBtnKonfirmasiClick = () => {
        if(document.getElementById("UploadBukti").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
      
            var data = {
                kode_booking: `${this.state.listCart.flight_productId}${Date.now()}`,
                username: this.state.listCart.username,
                tanggal_pesan: moment(this.state.listCart.tanggal_pesan).format('YYYY-MM-DD h:mm:ss'),
                tanggal_konfirmasi: moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
                flight_productId: this.state.listCart.flight_productId,
                image_maskapai: this.state.listCart.image,
                nama: this.state.listCart.nama,
                code: this.state.listCart.code,
                seat_class:  this.state.listCart.seat_class,
                harga:  this.state.listCart.harga,
                qty:  this.state.listCart.qty,
                total_harga:  this.state.listCart.total_harga,
                tanggal:  moment(this.state.listCart.tanggal).format('YYYY-MM-DD'),
                departure_city:  this.state.listCart.departure_city,
                departure_terminal:  this.state.listCart.departure_terminal,
                departure_time:  this.state.listCart.departure_time,
                departure_airport:  this.state.listCart.departure_airport,
                arrival_airport:  this.state.listCart.arrival_airport,
                arrival_city:  this.state.listCart.arrival_city,
                arrival_terminal:  this.state.listCart.arrival_terminal,
                arrival_time:  this.state.listCart.arrival_time,
                description: this.state.listCart.description,
                status_transaksi: 'Menunggu Persetujuan Pembayaran'
            }
      
            if(document.getElementById('UploadBukti')){
              formData.append('image', document.getElementById('UploadBukti').files[0])
            }
            formData.append('data', JSON.stringify(data))
            
            axios.post('http://localhost:1212/flight/addtransaction', formData, headers)
            .then((res) => {
                console.log(res.data)
                axios.post('http://localhost:1212/flight/updatepassenger', {
                    id_pesanan: this.state.listCart.id, 
                    id_transaksi: res.data.insertId
                })
                .then((res1) => {
                    console.log(res1.data)
                    axios.post('http://localhost:1212/flight/deletecart', {
                        id: this.state.listCart.id,
                        username: this.state.listCart.username,
                        flight_productId : this.state.listCart.flight_productId
                    })
                    .then((res2) => {
                        console.log(res2)
                        alert("Berhasil mengupload bukti pembayaran!")
                        this.setState({listCart: null})
                    })
                })
                .catch((err) => {
                    console.location(err)
                })
              
            })
            .catch((err) =>{
              console.log(err)
            })
          }
          else {
            alert('Bukti bayar harus diisi!')
          }
    }

    render(){
        var newUser = cookie.get('dataUser')
        if (newUser !== undefined) {
            if(this.state.listCart !== null) {
                var {username, image, nama, code, seat_class, tanggal, qty, harga, total_harga, tanggal_pesan,
                    departure_city, departure_terminal, departure_time, departure_airport,
                    arrival_city, arrival_terminal, arrival_time, arrival_airport, description} = this.state.listCart
            var { passenger1, passenger2, passenger3, passenger4, passenger5, 
                    ktp1, ktp2, ktp3, ktp4, ktp5 } = this.state.listPassenger
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
                            </FormGroup>
                        </FormGroup>
                        <Row style={{justifyContent: "space-around"}}>
                        <FormGroup className="col-lg-3">
                        <img src={`http://localhost:1212${image}`} alt={nama} style={{width:"100px"}}/>
                        <h3 style={{fontSize:"16px", color:"#000", fontWeight:"bold"}}>{nama}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold"}}>{code}</h3>
                        <h3 style={{fontSize:"13px", color:"#000"}}>{seat_class}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"40px"}}>
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{moment(tanggal).format('dddd, DD MMMM YYYY')}</h3>
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{departure_time}</h3>
                        <br />
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left", paddingLeft:20}}><i className="fa fa-arrow-down"/></h3>
                        <br/>
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left"}}>{arrival_time}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"30px"}}>
                    <h3 style={{fontSize:"14px", color:"#000", textAlign:"left", fontWeight:'bold'}}>{departure_city}</h3>
                        <h3 style={{fontSize:"13px", color:"#000", textAlign:"left"}}>{departure_airport} ({departure_terminal})</h3>
                        <br/>
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left", fontWeight:'bold'}}>to:</h3>
                        <br/>
                        <h3 style={{fontSize:"14px", color:"#000", textAlign:"left", fontWeight:'bold'}}>{arrival_city}</h3>
                        <h3 style={{fontSize:"13px", color:"#000", textAlign:"left"}}>{arrival_airport} ({arrival_terminal})</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"-100px"}}>
                        <h3 style={{fontSize:"14px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Description</h3>
                        <h3 style={{fontSize:"13px", color:"#000", textAlign:"left"}}>{description}</h3>
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
                        <FormGroup></FormGroup>
                        <h3 style={{fontSize:"16px", fontWeight:"bold", color:"#000", textAlign:"left"}}>Upload Pembayaran: </h3>
                        <Input type="file" id="UploadBukti" name="UploadBukti" label={this.state.UploadBukti} onChange={this.onFileChange} style={{marginLeft: '20px', width: '80%'}}/>
                        <FormGroup></FormGroup>
                        <input type="button" className="btn btn-success" value="Konfirmasi Pembayaran" style={{width:"250px", textAlign:"center"}} onClick={this.onBtnKonfirmasiClick}/>
                        </FormGroup>
                        </FormGroup>
                        </Form>
                    </Container>
                    <FooterTID />
                    </div>
                );
            }
            return <Redirect to="/" />
        }
        return <Redirect to="/" />
        }
}



export default (ProductFlightCartDetail);