import React, { Component } from 'react';
import {
    Container, Form,
    FormGroup, Input,
    Button,
  } from 'reactstrap';


class FormFlight extends Component {
    render(){
        return(
            <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px"}}>
                <center><h2 style={{marginTop: "10px"}}>Cari Tiket Pesawat Anda Sekarang!</h2></center>
                <Form className="form">
                <FormGroup>
                    
                        <h5><b>Kota Asal</b></h5>
                        <Input type="text" name="deptCity" id="deptCity" placeholder="Kota Asal" style={{width: "200px"}}/>
                        <h5><b>Kota Tujuan</b></h5>
                        <Input type="text" name="arrCity" id="arrCity" placeholder="Kota Tujuan" style={{width: "200px"}}/>
                 
                </FormGroup>
                <FormGroup>
                    <h5><b>Tanggal</b></h5>
                    <Input type="date" style={{width: "200px"}}/>
                </FormGroup>
                <FormGroup>
                    <h5><b>Jumlah Penumpang</b></h5>
                    <Input type="select" name="jumlahSeat" id="jumlahSeat" style={{width: "300px"}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </ Input>
                    <h5><b>Kelas Penerbangan</b></h5>
                    <Input type="select" name="kelas" id="kelas"style={{width: "300px"}}>
                        <option>Ekonomi</option>
                        <option>Bisnis</option>
                    </ Input>
                </FormGroup>
                <FormGroup style={{marginBottom: "10px"}}>
                <center><Button>Submit</Button></center>
                </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default FormFlight;