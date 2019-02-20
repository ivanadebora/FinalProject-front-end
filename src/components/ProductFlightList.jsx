import React, { Component } from 'react';
import '../supports/filter/reset.css';
import '../supports/filter/style2.css';
import {
    Container, Form,
    FormGroup, Input,
    Button,
  } from 'reactstrap';


class ProductFlightList extends Component {
    render(){
        return(
            <div id="hero" className="wow fadeIn">
            <div className="hero-container" >
            <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px"}}>
                <Form className="form">
                <center><h6 style={{marginTop: "10px", color:"#000"}}>Filter</h6></center>
                <FormGroup></FormGroup>
                <FormGroup>
                        <Input type="checkbox" name="deptCity" id="deptCity" ref="deptCity" innerRef="tbDeptCity" placeholder="Kota Asal" style={{width: "200px"}}/>
                        <h6 style={{color:"#000"}}><b>Kota Tujuan</b></h6>
                        <Input type="text" name="arrCity" id="arrCity" ref="arrCity" innerRef="tbArrCity" placeholder="Kota Tujuan" style={{width: "200px"}}/>
                 
                </FormGroup>
                <FormGroup>
                    <h6 style={{color:"#000"}}><b>Tanggal</b></h6>
                    <Input type="date" name="date" id="date" ref="date" innerRef="tbDate" style={{width: "200px"}}/>
                </FormGroup>
                <FormGroup>
                    <h6 style={{color:"#000"}}><b>Jumlah Penumpang</b></h6>
                    <Input type="select" name="jumlahSeat" id="jumlahSeat" ref="jumlahSeat" innerRef="tbJumlahSeat" style={{width: "300px"}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </ Input>
                    <h6 style={{color:"#000"}}><b>Kelas Penerbangan</b></h6>
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
        )
    }
}

export default ProductFlightList;