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

    // componentDidMount() {
    //     this.getListMaskapai();
    //     console.log(this.props.product.departure_city)
    //     console.log(this.props.product.arrival_city)
    //     console.log(this.props.product.tanggal)
    //     console.log(this.props.product.seat_class)
    //     console.log(this.props.product.qty)
    //     var departure_city = this.props.product.departure_city ;
    //     var arrival_city = this.props.product.arrival_city ;
    //     var tanggal = this.props.product.tanggal ;
    //     var seat_class = this.props.product.seat_class;
    //     var qty = this.props.product.qty;

    //     axios.post('http://localhost:1212/flight/listsearch', {
    //             departure_city, arrival_city, tanggal, seat_class, qty
    //         })
    //         .then((res) => {
    //             console.log(res.data)
    //             this.setState({listProductFlight: res.data, searchListFlight: res.data})
    //         })
    //         .catch((err) => {
    //             console.log (err)
    //         })
    // }
    
    // getListMaskapai = () => {
    //     axios.get('http://localhost:1212/flight/listmaskapai')
    //     .then((res) => {
    //         this.setState({ listMaskapai: res.data })
    //         console.log(res.data)
    //     })
    // }

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
        var listJSXFlight = this.props.product1.map((item) => {
            return (
                <tr>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td style={{paddingLeft:'50px'}}>{item.nama}</td>
                    <td style={{paddingLeft:'100px'}}>{item.code}</td>
                    <td style={{paddingLeft:'100px'}}>{item.departure_city}</td>
                    <td style={{paddingLeft:'100px'}}>{item.departure_time}</td>
                    <td style={{paddingLeft:'100px'}}>{item.arrival_city}</td>
                    <td style={{paddingLeft:'100px'}}>{item.arrival_time}</td>
                    <td style={{paddingLeft:'100px'}}>{rupiah.format(item.harga)}</td>
                    <td style={{paddingLeft:'100px'}}><a href={`/flightdetailpesanan?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onPesanClick(item.id)}>Pesan</a></td>
                    <td style={{paddingLeft:'100px'}}><a href={`/flightdetail?productId=${this.props.product.id}&username=${this.props.product.username}&qty=${this.props.product.qty}`} onClick={() => this.onLihatClick(item.id)}>Lihat Detail</a></td>
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
            <Container style={{border: "3px solid light", backgroundColor:"#2abe8d", width:"600px", marginTop:"100px"}}>
                {/* <Form className="form">
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
                </Form> */}
            </Container>
            <div style={{marginTop:"20px", width:"1500px"}}>
            <div className="col-lg-12" style={{ paddingLeft:"120px", width: "1500px" }}>
                    <section>
                      <div className="tbl-header" style={{height:"40px", width: "1500px"}}>
                        <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                          <thead>
                            <tr>
                            <th style={{paddingLeft:'50px', color:"#fff"}}>Image</th>
                              <th style={{paddingLeft:'100px', color:"#fff"}}>Nama Maskapai</th>
                              <th style={{paddingLeft:'100px', color:"#fff"}}>Kode Penerbangan</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Kota Asal</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Waktu Keberangkatan</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Kota Tujuan</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Waktu Kedatangan</th>
                              <th style={{paddingLeft:'100px', color:"#fff"}}>Harga</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                        </table>
                        </div>
                          <div className="tbl-content" style={{paddingRight: '40px', width: "1500px"}}>
                            <table className= "tabel2" cellPadding={100} cellSpacing={100} border={0}>
                              <tbody>
                              {this.renderListFlight()}
                              </tbody>
                            </table>
                          </div>
                        </section>
                       
                      </div>
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
        product: state.selectedFlight,
        product1: state.searchList
    }
}

export default connect(mapStateToProps, { select_flight })(ProductFlightList);