import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Cookies from 'universal-cookie';
import {
  Card, CardText, CardGroup, Row, Container, Col
} from 'reactstrap';

const cookie = new Cookies()
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class ProductFlightHistory extends Component {

    state = {listHistory: [], idSelectedItem: 0}

    componentDidMount() {
      this.getListHistory();
    }


    getListHistory = ()  => {
      const newUsername = cookie.get('dataUser')
      axios.post( 'http://localhost:1212/flight/lihathistory', {
        username: newUsername
      })
      .then((res) => {
          console.log(res.data)
          this.setState({listHistory:res.data})
      })
      .catch((err) => {
          console.log(err)
      })
    }

    onLihatClick = (id) => {
      this.setState({idSelectedItem:id})
      console.log(id)
  }
    

    renderListHistoryFlight = () => {
      if(this.state.listHistory.length !==0){
        var listJSXHistoryFlight = this.state.listHistory.map((item) => {
            return (
              <Col lg="12" style={{ marginTop: "20px" }}>
                <Card className="card bg-dark" style={{height:130, borderRadius:10}}>
                  <CardGroup style={{marginTop:5, marginBottom:5}}>
                    <CardText>
                    <h3 style={{fontSize:16, paddingLeft:25, color: "#fff"}}>{moment(item.tanggal_konfirmasi).format('MMMM Do YYYY, H:MM:SS a')}</h3>
                    </CardText>
                  </CardGroup>
                  <CardGroup style={{marginTop:5, marginBottom:5}}>
                    <CardText>
                    <Row>
                      <h3 style={{fontSize:18, paddingLeft:40, color: "#fff" }}>Kode Booking: {item.id}</h3>
                      <h3 style={{fontSize:18, paddingLeft:780, color: "#fff"}}>{rupiah.format(item.total_harga)}</h3>
                    </Row>
                    </CardText>
                  </CardGroup >
                  <CardGroup style={{marginTop:5, marginBottom:5}}>
                    <CardText>
                    <h3 style={{fontSize:18, color: "#fff", paddingLeft:25}}><i className="fa fa-plane"/> {item.departure_city} - {item.arrival_city}</h3>
                    </CardText>
                  </CardGroup>
                  <CardGroup style={{marginTop:5, marginBottom:5}}>
                    <CardText>
                      <h3 style={{fontSize:16, paddingLeft:25, color: "#fff"}} ><i className="fa fa-check-circle"/> Status: {item.status_transaksi}</h3>
                    </CardText>
                  </CardGroup>
                  <CardGroup style={{marginTop:5, marginBottom:5}}>
                    <center>
                    <h3 style={{fontSize:16, paddingLeft:500}} ><a href={`/flight_ticket?ticket_id=${item.id}&username=${item.username}`} onClick={() => this.onLihatClick(item.id)}> Lihat Tiket</a></h3>
                    </center>
                  </CardGroup>
                </Card>
              </Col>
            )
        })
        return listJSXHistoryFlight;
      }
      else if (this.state.listHistory.length ===0) {
        return (
          <center><div style={{marginTop:50}}>
          <img src='img/history.png' alt='images' width={200}/>
          <h3 fontSize={20}>It's seems that you have no history transaction! Book your ticket now!</h3>
          </div></center>
        )
      }
    }

    render(){
      if(this.props.username !== '') {
        return(
          <Container>
            <Card className="card bg-dark" style={{marginTop:100,  borderRadius:5}}>
              <CardText>
                <h3 style={{fontSize:20, padding:5, color: "#fff"}}><i className="fa fa-history" /> Find all your e-tickets and vouchers here</h3>
              </CardText>
            </Card>
            {this.renderListHistoryFlight()}
          </Container>
        )
      }
      return <Redirect to='/' />
    }
}

const mapStateToProps = (state) => {
  console.log(state.auth.username)
  return {
      username: state.auth.username
  }
}

export default connect(mapStateToProps)(ProductFlightHistory);