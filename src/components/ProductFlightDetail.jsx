import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
import {
    Container, Form,
    FormGroup, Row
} from 'reactstrap';
import { select_flight } from '../actions'



class ProductFlightDetail extends Component {

    componentDidMount() {
        // var productId = this.props.match.params.id;
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var product_id = params.productId
        var username = params.username;
        var qty = params.qty;
        console.log(product_id)
        axios.post( `http://localhost:1212/flight/getdetail`,{
            product_id
        })
        .then((res) => {
            console.log(res.data)
            this.props.select_flight({...res.data[0], username, qty})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        var { image, nama, code, seat_class, tanggal,
            departure_city, departure_time, departure_terminal,
            arrival_city, arrival_time, arrival_terminal, description
        } = this.props.product
            return(
                <div id="hero" className="wow fadeIn">
                <div className="hero-container">
                <Container style={{border: "3px solid light", backgroundColor:"#fff", width:"1200px", marginTop:"-200px"}}>
                    <Form className="form">
                    <center><h2 style={{marginTop: "10px", color:"#000", fontWeight:"bold"}}>Detail Product:</h2></center>
                    <FormGroup></FormGroup>
                    <Row style={{justifyContent: "space-around"}}>
                    <FormGroup className="col-lg-3">
                        <img src={`http://localhost:1212${image}`} alt={nama}/>
                        <h3 style={{fontSize:"20px", color:"#000", fontWeight:"bold"}}>{nama}</h3>
                        <h3 style={{fontSize:"18px", color:"#000", fontWeight:"bold"}}>{code}</h3>
                        <h3 style={{fontSize:"16px", color:"#000"}}>{seat_class}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"40px"}}>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{moment(tanggal).format('dddd, DD MMMM YYYY')}</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{departure_time}</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>sampai</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{arrival_time}</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"30px"}}>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left", fontWeight:"bold"}}>dari:</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{departure_city} ({departure_terminal})</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left", paddingLeft:"20px"}}>|</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left", fontWeight:"bold"}}>tujuan:</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{arrival_city} ({arrival_terminal})</h3>
                    </FormGroup>
                    <FormGroup className="col-lg-3" style={{marginTop:"10px", paddingLeft:"-100px"}}>
                        <h3 style={{fontSize:"16px", color:"#000", fontWeight:"bold", textAlign:"left"}}>Description</h3>
                        <h3 style={{fontSize:"16px", color:"#000", textAlign:"left"}}>{description}</h3>
                    </FormGroup>
                    </Row>
                    <FormGroup></FormGroup>
                    <FormGroup style={{justifyContent:"center"}}>
                        <a href="/flighthome" >Kembali</a>
                    </FormGroup>
                    </Form>
                </Container>
                </div>
            </div>
            );
        }
}

const mapStateToProps = (state) => {
    console.log(state.selectedFlight)
    return { 
        username: state.auth.username,
        product: state.selectedFlight
    }
}

export default connect(mapStateToProps, { select_flight })(ProductFlightDetail);