import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../supports/filter/reset.css';
import '../supports/filter/style2.css';
import {
    Container, Form,
    FormGroup, Input,
    Button, Row
} from 'reactstrap';
import { select_flight  } from '../actions/'



const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class ProductFlightList extends Component {

    state = { listMaskapai: [], listProductFlight: [], searchListFlight: [], idSelectedItem: 0}

    componentDidMount() {
        this.getListMaskapai();
        console.log(this.props.product.departure_city)
        console.log(this.props.product.arrival_city)
        console.log(this.props.product.tanggal)
        console.log(this.props.product.seat_class)
        console.log(this.props.product.qty)
        var departure_city = this.props.product.departure_city ;
        var arrival_city = this.props.product.arrival_city ;
        var tanggal = this.props.product.tanggal ;
        var seat_class = this.props.product.seat_class;
        var qty = this.props.product.qty;

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
        var nama = this.refs.maskapaiFilter.refs.tbMaskapaiFilter.value;
    
        var arrSearch = this.state.listProductFlight.filter((item) => {
          return (item.nama.toLowerCase().includes(nama.toLowerCase()))
        })
        this.setState({searchListFlight: arrSearch})
    }

    onPesanClick = (id) =>{
        this.setState({idSelectedItem:id})
         this.props.select_flight({id})
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
        var listJSXFlight = this.state.searchListFlight.map((item) => {
            return (
                <tr>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td>{item.nama}</td>
                    <td>{item.code}</td>
                    <td>{item.departure_city}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.arrival_city}</td>
                    <td>{item.arrival_time}</td>
                    <td>{rupiah.format(item.harga)}</td>
                    <td><a href={`/flightdetailpesanan?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onPesanClick(item.id)}>Pesan</a></td>
                    <td><a href={`/flightdetail?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onLihatClick(item.id)}>Lihat Detail</a></td>
                </tr>
            )
        })
        return listJSXFlight;
    }

    render(){
        if(this.props.username !== '') {
        return(
            <div id="hero" className="wow fadeIn">
            <div className="hero-container" >
            <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px", marginTop:"-200px"}}>
                <Form className="form">
                <Row style={{justifyContent:"space-around"}}>
                    <FormGroup className="filter">
                        <h5 style={{marginTop: "10px", color:"#000"}}>Filter: </h5>
                        <FormGroup>
                            <h6 style={{marginTop: "10px", color:"#000"}}>Maskapai: </h6>
                            <Input type="select" name="maskapaiFilter" id="maskapaiFilter" ref="maskapaiFilter" innerRef="tbMaskapaiFilter" style={{width: "150px"}}>
                                {this.renderMaskapai()}
                            </ Input>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="sort">
                        <h5 style={{marginTop: "10px", color:"#000"}}>Urut berdasarkan: </h5>
                        <FormGroup></FormGroup>
                        <Input type="select" name="sorting" id="sorting" ref="sorting" innerRef="tbsorting" style={{width: "250px"}}>
                            <option value="hargaMin" >Harga Terendah</option>
                            <option value="hargaMax" >Harga Terendah</option>
                            <option value="timeMax" >Waktu Berangkat Paling Awal</option>
                            <option value="timeMin" >Waktu Berangkat Paling Akhir</option>
                        </ Input>
                    </FormGroup>
                </Row>
                <FormGroup style={{marginBottom: "10px"}}>
                    <Row style={{justifyContent:"space-around"}}>
                        <Button onClick={this.onBtnSearchClick}><i className="fa fa-search fa-2x"  /> Search</Button>
                        <a href="/flighthome" style={{paddingTop:"15px", color:"#000"}}>Ganti Pencarian</a>
                    </Row>
                </FormGroup>
                </Form>
            </Container>
            <div style={{marginTop:"20px", width:"1200px"}}>
                        <table className="table-responsive">
                          <thead className="theadList">
                            <tr>
                              <th>Image</th>
                              <th>Nama Maskapai</th>
                              <th>Kode Penerbangan</th>
                              <th>Kota Asal</th>
                              <th>Waktu Keberangkatan</th>
                              <th>Kota Tujuan</th>
                              <th>Waktu Kedatangan</th>
                              <th>Harga</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className="tbodyList">
                            {this.renderListFlight()}
                          </tbody>
                        </table>
                      </div>

            </div>
            </div>
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
        product: state.selectedFlight
    }
}

export default connect(mapStateToProps, { select_flight })(ProductFlightList);