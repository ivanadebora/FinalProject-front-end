import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Pagination from 'react-js-pagination';
import {
  Card, CardText, CardGroup, Row, Container, Col
} from 'reactstrap';
import FooterTID from './FooterTID';

const cookie = new Cookies()
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class ProductFlightCart extends Component {

    state = {listCart: [], idSelectedItem: 0, activePage: 1, itemPerPage: 3}

    componentDidMount() {
      this.getListCart();
    }


    getListCart = ()  => {
      const newUsername = cookie.get('dataUser')
      axios.post( 'http://localhost:1212/flight/lihatcart', {
          username: newUsername
      })
      .then((res) => {
          console.log(res.data)
          this.setState({listCart:res.data})
      })
      .catch((err) => {
          console.log(err)
      })
    }

    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
  }

    onLihatClick = (id) => {
      this.setState({idSelectedItem:id})
      console.log(id)
  }
    

    renderListCartFlight = () => {
      if(this.state.listCart.length !==0){
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects =  this.state.listCart.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXCartFlight = renderedProjects.map((item) => {
          return (
            <Col lg="12" style={{ marginTop: "20px" }}>
            <Card className="card bg-dark" style={{height:130, borderRadius:10}}>
              <CardGroup style={{marginTop:5, marginBottom:5}}>
                <CardText>
                <h3 style={{fontSize:16, paddingLeft:25, color: "#fff"}}>{moment(item.tanggal_pesan).format('MMMM Do YYYY, H:MM:SS')}</h3>
                </CardText>
              </CardGroup>
              <CardGroup style={{marginTop:5, marginBottom:5}}>
                <CardText>
                <Row>
                  <h3 style={{fontSize:18, paddingLeft:40, color: "#fff" }}>Kode Pesanan: {item.id}</h3>
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
                  <h3 style={{fontSize:16, paddingLeft:25, color: "#fff"}} >{item.nama} ({item.code})</h3>
                </CardText>
              </CardGroup>
              <CardGroup style={{marginTop:5, marginBottom:5}}>
                <center>
                <h3 style={{fontSize:16, paddingLeft:500}} ><a href={`/flightcartdetail?order_id=${item.id}&username=${item.username}`} onClick={() => this.onLihatClick(item.id)}>Detail Pesanan</a></h3>
                </center>
              </CardGroup>
            </Card>
          </Col>
          )
      })
      return listJSXCartFlight;
      }
      else if (this.state.listCart.length ===0) {
        return (
          <center><div style={{marginTop:50}}>
          <img src='img/icon.png' alt='images' width={150}/>
          <h3 fontSize={20}>It's seems that you have no cart transaction!</h3>
          </div></center>
        )
      }
    }

    render(){
      if(this.props.username !== '') {
        return(
          <div>
          <Container>
          <Card className="card bg-dark" style={{marginTop:100,  borderRadius:5}}>
            <CardText>
              <h3 style={{fontSize:20, padding:5, color: "#fff"}}><i className="fa fa-shopping-cart" /> Find your cart and finish transaction here</h3>
            </CardText>
          </Card>
          {this.renderListCartFlight()}
          <center><Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.listCart.length}
                            pageRangeDisplayed={3}
                            onChange={this.handlePageChange.bind(this)}
                        /></center>
        </Container>
        <FooterTID />
        </div>
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

export default connect(mapStateToProps)(ProductFlightCart);