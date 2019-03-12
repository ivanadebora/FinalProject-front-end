import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import {
    Container, Form, FormGroup, Input, Row, Button, Col, Card, CardText
} from 'reactstrap';
import { select_flight  } from '../actions/'



const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class ProductFlightList extends Component {

    state = { listMaskapai: [], listProductFlight: [], searchListFlight: [], idSelectedItem: 0}

    componentDidMount() {
        this.getListMaskapai();
        var params = queryString.parse(this.props.location.search)
        var departure_city = params.dept_city;
        var arrival_city = params.arr_city;
        var tanggal = params.tanggal;
        var seat_class = params.kelas;
        var qty = parseInt(params.jumlah_penumpang)
        console.log(params)

        axios.post('http://localhost:1212/flight/listsearch', {
                departure_city, arrival_city, tanggal, seat_class, qty
            })
            .then((res) => {
                console.log(res.data)
                this.setState({listProductFlight: res.data, searchListFlight: res.data})
            })
            .catch((err) => {
                console.log (err)
            })
    }
    
    getListMaskapai = () => {
        axios.get('http://localhost:1212/flight/listmaskapai')
        .then((res) => {
            this.setState({ listMaskapai: res.data })
            console.log(res.data)
        })
    }

    onBtnSearchClick() {
        var params = queryString.parse(this.props.location.search)
        var departure_city = params.dept_city;
        var arrival_city = params.arr_city;
        var tanggal = params.tanggal;
        var seat_class = params.kelas;
        var qty = parseInt(params.jumlah_penumpang)
        var nama = this.refs.filterings.refs.tbfilterings.value;
        var sortingby = this.refs.sorting.refs.tbsorting.value;

        if(sortingby === 'hargaMax'){
            axios.post('http://localhost:1212/flight/listsearchmaxprice', {
                departure_city, arrival_city, tanggal, seat_class, qty
            })
            .then((res) => {
                this.setState({listProductFlight: res.data, searchListFlight: res.data})
                
                var arrSearch = this.state.listProductFlight.filter((item) => {
                    return (item.nama.includes(nama))
                })
                this.setState({searchListFlight: arrSearch})
            })
            .catch((err) => {
                console.log (err)
            })
        }
        else if(sortingby === 'hargaMin'){
            axios.post('http://localhost:1212/flight/listsearchminprice', {
                departure_city, arrival_city, tanggal, seat_class, qty
            })
            .then((res) => {
                this.setState({listProductFlight: res.data, searchListFlight: res.data})
                
                var arrSearch = this.state.listProductFlight.filter((item) => {
                    return (item.nama.includes(nama))
                })
                this.setState({searchListFlight: arrSearch})
            })
            .catch((err) => {
                console.log (err)
            })
        }
        else if(sortingby === 'timeAwal'){
            axios.post('http://localhost:1212/flight/listsearchtimeawal', {
                departure_city, arrival_city, tanggal, seat_class, qty
            })
            .then((res) => {
                this.setState({listProductFlight: res.data, searchListFlight: res.data})
                
                var arrSearch = this.state.listProductFlight.filter((item) => {
                    return (item.nama.includes(nama))
                })
                this.setState({searchListFlight: arrSearch})
            })
            .catch((err) => {
                console.log (err)
            })
        }
        else if(sortingby === 'timeAkhir'){
            axios.post('http://localhost:1212/flight/listsearchtimeakhir', {
                departure_city, arrival_city, tanggal, seat_class, qty
            })
            .then((res) => {
                this.setState({listProductFlight: res.data, searchListFlight: res.data})
                
                var arrSearch = this.state.listProductFlight.filter((item) => {
                    return (item.nama.includes(nama))
                })
                this.setState({searchListFlight: arrSearch})
            })
            .catch((err) => {
                console.log (err)
            })
        }
    }

    onPesanClick = (id) =>{
        this.setState({idSelectedItem:id})
        this.props.select_flight({id});
    }
    
    onLihatClick = (id) => {
        this.setState({idSelectedItem:id})
        console.log(id)
        this.props.select_flight({id})
    }

    renderMaskapai = () => {
        var listJSXMaskapai = this.state.listMaskapai.map((item) => {
            return (
                <option value={item.nama}>{item.nama}</option>
            )
        })
        return listJSXMaskapai
    }

    renderListFlight = () => {
        if(this.state.searchListFlight.length !==0){
            var listJSXFlight = this.state.searchListFlight.map((item) => {
                return (
                    <Col lg="12" style={{ marginTop: "5px", marginBottom:"10px" }}>
                    
                    <Card style={{height:140, borderRadius:10, border:"2px solid #2abe8d"}}>
                    <Row style={{justifyContent: "space-around"}}>
                        <CardText style={{marginTop:30, width:200}}>
                            <img  className="img-responsive" src={`http://localhost:1212${item.image}`} alt={item.nama} style={{height:30}}/>
                            <h3 style={{fontSize:16, fontWeight:'bold'}}>{item.nama}</h3>
                            <p>{item.code}</p>
                        </CardText>
                        <CardText style={{marginTop:30}}>
                            <h3 style={{fontSize:16, fontWeight:'bold'}}>{item.departure_city}</h3>
                            <p>{item.departure_time}</p>
                        </CardText>
                        <CardText style={{marginTop:20}}>
                            <br/>
                            <i className="fa fa-chevron-right"/><i className="fa fa-chevron-right"/><i className="fa fa-chevron-right"/>
                        </CardText>
                        <CardText style={{marginTop:30}}>
                            <h3 style={{fontSize:16, fontWeight:'bold'}}>{item.arrival_city}</h3>
                            <p>{item.arrival_time}</p>
                        </CardText>
                        <CardText style={{marginTop:30}}>
                            <h3 style={{fontSize:16, fontWeight:'bold', color:"#ef4d13"}}>{rupiah.format(item.harga)}</h3>
                            <Button className="btn btn-success" href={`/flightdetailpesanan?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onPesanClick(item.id)}>Pesan</Button><br/>
                            <a href={`/flightdetail?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onLihatClick(item.id)}>Lihat Detail</a>
                        </CardText>
                    </Row>
                    </Card>
                    </Col>
                )
            })
            return listJSXFlight;
            }
            else if (this.state.searchListFlight.length ===0) {
                return (
                    <center><Col lg="12" style={{ marginTop: "5px", marginBottom:"10px" }}>
                    <Card style={{height:200, borderRadius:10, border:"2px solid #2abe8d"}}>
                    <img src='img/404.png' alt='images' width={150}/>
                    <h3 fontSize={20}>Oops, your flight could not be found!</h3>
                    </Card>
                    </Col></center>
                  
                )
              }
    }

    render(){
        if(this.props.username !== '') {
        return(
            <center><Container>
                <Form className="form"  style={{border: "3px solid light", borderRadius: 10, backgroundColor:"#2abe8d", width:"600px", height: "200px", marginTop:"80px"}}>
                <Row style={{justifyContent:"space-around"}}>
                    <FormGroup className="filter">
                        <h5 style={{marginTop: "10px", color:"#000"}}>Filter: </h5>
                        <FormGroup>
                            <h6 style={{marginTop: "10px", color:"#000"}}>Maskapai: </h6>
                            <Input type="select" name="filterings" id="filterings" ref="filterings" innerRef="tbfilterings" style={{width: "150px"}}>
                                <option value=''>All</option>
                                {this.renderMaskapai()}
                            </ Input>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="sort">
                        <h5 style={{marginTop: "10px", color:"#000"}}>Urut berdasarkan: </h5>
                        <FormGroup></FormGroup>
                        <Input type="select" name="sorting" id="sorting" ref="sorting" innerRef="tbsorting" style={{width: "250px"}}>
                            <option value="hargaMin" >Harga Terendah</option>
                            <option value="hargaMax" >Harga Tertinggi</option>
                            <option value="timeAwal" >Waktu Berangkat Paling Awal</option>
                            <option value="timeAkhir" >Waktu Berangkat Paling Akhir</option>
                        </ Input>
                    </FormGroup>
                </Row>
                <FormGroup style={{marginBottom: "10px"}}>
                    <Row style={{justifyContent:"space-around"}}>
                        <Button  onClick={this.onBtnSearchClick.bind(this)}><i className="fa fa-search fa-2x"  /> Search</Button>
                        <a href="/flighthome" style={{paddingTop:"15px", color:"#000"}}>Ganti Pencarian</a>
                    </Row>
                </FormGroup>
                </Form>
                <br />
                {this.renderListFlight()}
            </Container></center>
            
        )
        }
        return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => {
    console.log(state.searchList)
    console.log(state.selectedFlight)
    return { 
        username: state.auth.username,
        product: state.selectedFlight,
    }
}

export default connect(mapStateToProps, { select_flight })(ProductFlightList);