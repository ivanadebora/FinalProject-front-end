import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container, Form,
    FormGroup, Input,
    Button,
  } from 'reactstrap';


class FormFlight extends Component {

    onBtnSearchClick = () => {
        var departure_city = this.refs.deptCity.refs.tbDeptCity.value;
        var arrival_city = this.refs.arrCity.refs.tbArrCity.value;
        var tanggal = this.refs.date.refs.tbDate.value;
        var jumlah_seat = this.refs.JumlahSeat.refs.tbJumlahSeat.value;
        var seat_class = this.refs.kelas.refs.tbKelas.value;
        this.props.onUserSearchFlight({departure_city,arrival_city,tanggal,jumlah_seat, seat_class});
        return (<Redirect to="/flightlist" />)
    }

    render(){
        return(
            <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px"}}>
                <Form className="form">
                <center><h2 style={{marginTop: "10px", color:"#000"}}>Cari Tiket Pesawat Anda Sekarang!</h2></center>
                <FormGroup></FormGroup>
                <FormGroup>
                    
                        <h5 style={{color:"#000"}}><b>Kota Asal</b></h5>
                        <Input type="text" name="deptCity" id="deptCity" ref="deptCity" innerRef="tbDeptCity" placeholder="Kota Asal" style={{width: "200px"}}/>
                        <h5 style={{color:"#000"}}><b>Kota Tujuan</b></h5>
                        <Input type="text" name="arrCity" id="arrCity" ref="arrCity" innerRef="tbArrCity" placeholder="Kota Tujuan" style={{width: "200px"}}/>
                 
                </FormGroup>
                <FormGroup>
                    <h5 style={{color:"#000"}}><b>Tanggal</b></h5>
                    <Input type="date" name="date" id="date" ref="date" innerRef="tbDate" style={{width: "200px"}}/>
                </FormGroup>
                <FormGroup>
                    <h5 style={{color:"#000"}}><b>Jumlah Penumpang</b></h5>
                    <Input type="select" name="jumlahSeat" id="jumlahSeat" ref="jumlahSeat" innerRef="tbJumlahSeat" style={{width: "300px"}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
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
        )
    }
}

export default FormFlight;