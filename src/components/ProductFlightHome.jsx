import React, { Component } from 'react';
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie'
import {
    Container, Form,
    FormGroup, Input,
    Button, Row
} from 'reactstrap';
import CarouselFlight from './CarouselFlight';
import { onUserSearchFlight, select_flight } from '../actions';


const cookies = new Cookies()
class ProductFlightHome extends Component {

    onBtnSearchClick = () => {
        var departure_city = this.refs.deptCity.refs.tbDeptCity.value;
        var arrival_city = this.refs.arrCity.refs.tbArrCity.value;
        var tanggal = this.refs.date.refs.tbDate.value || moment(new Date()).format('YYYY-MM-DD');
        var qty = parseInt(this.refs.jumlahSeat.refs.tbJumlahSeat.value);
        var seat_class = this.refs.kelas.refs.tbKelas.value;
        var username = this.props.username
        
        this.props.onUserSearchFlight({username, departure_city, arrival_city, tanggal, qty, seat_class});
        this.props.select_flight({username, departure_city, arrival_city, tanggal, qty, seat_class})
    }

    render() {
        var newUser = cookies.get('dataUser')
        if(newUser !== ''){
            if(this.props.length > 0 ){
                return <Redirect to="/flightlist" />
            }
            return(
                <div>
                <div id="hero" className="wow fadeIn" style={{marginTop:"-80px"}}>
                    <div className="hero-container">
                        <CarouselFlight />
                    </div>
               </div>
               <div id="get-started" className="padd-section wow fadeInUp" style={{marginTop:"-180px"}}>
                    <div className="container">
                    <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px"}}>
                    <Form className="form">
                    <center><h2 style={{marginTop: "10px", color:"#000"}}>Cari Tiket Pesawat Anda Sekarang!</h2></center>
                    <FormGroup></FormGroup>
                    <Row style={{justifyContent: "space-around"}}>
                    <FormGroup>
                            <h5 style={{color:"#000"}}><b>Kota Asal</b></h5>
                            <Input type="text" name="deptCity" id="deptCity" ref="deptCity" innerRef="tbDeptCity" placeholder="Kota Asal" style={{width: "200px"}}/>
                    </FormGroup>
                    <FormGroup>
                            <h5 style={{color:"#000"}}><b>Kota Tujuan</b></h5>
                            <Input type="text" name="arrCity" id="arrCity" ref="arrCity" innerRef="tbArrCity" placeholder="Kota Tujuan" style={{width: "200px"}}/>
                    </FormGroup>
                    </Row>
                    <FormGroup style={{paddingLeft:"60px"}}>
                        <h5 style={{color:"#000"}}><b>Tanggal</b></h5>
                        <Input type="date" name="date" id="date" ref="date" innerRef="tbDate" style={{width: "200px"}} defaultValue={new Date()}/>
                    </FormGroup>
                    <FormGroup style={{paddingLeft:"60px"}}>
                        <h5 style={{color:"#000"}}><b>Jumlah Penumpang</b></h5>
                        <Input type="select" name="jumlahSeat" id="jumlahSeat" ref="jumlahSeat" innerRef="tbJumlahSeat" style={{width: "300px"}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </ Input>
                        <h5 style={{color:"#000"}}><b>Kelas Penerbangan</b></h5>
                        <Input type="select" name="kelas" id="kelas" ref="kelas" innerRef="tbKelas"style={{width: "300px"}}>
                            <option>Ekonomi</option>
                            <option>Bisnis</option>
                        </ Input>
                    </FormGroup>
                    <FormGroup style={{marginBottom: "10px"}}>
                    <center><Button onClick={this.onBtnSearchClick}><i className="fa fa-search fa-2x"  /> Search</Button></center>
                    </FormGroup>
                    </Form>
                </Container>
                    </div>
                </div>
               </div>
            )
        }
            return <Redirect to="/" />
        }
}


const mapStateToProps = (state) => {
    console.log(state.searchList)
    console.log(state.searchList.length)
    return {
        length: state.searchList.length,
        username: state.auth.username
    };
}


export default connect(mapStateToProps, {onUserSearchFlight, select_flight})(ProductFlightHome);