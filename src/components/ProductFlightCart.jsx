import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import '../supports/filter/reset.css';
import '../supports/filter/style2.css';


const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class ProductFlightCart extends Component {

    state = {listCart: [], idSelectedItem: 0}

    componentWillMount() {
      this.getListCart();
    }


    getListCart = ()  => {
      axios.post( 'http://localhost:1212/flight/lihatcart')
      .then((res) => {
          console.log(res.data)
          this.setState({listCart:res.data})
      })
      .catch((err) => {
          console.log(err)
      })
    }

    onLihatClick = (id) => {
      this.setState({idSelectedItem:id})
      console.log(id)
  }
    

    renderListCartFlight = () => {
        var listJSXFlight = this.state.listCart.map((item) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{moment(item.tanggal).format('YYYY-MM-DD, h:mm:ss')}</td>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td>{item.code}</td>
                    <td>{item.departure_city}</td>
                    <td>{item.arrival_city}</td>
                    <td>{item.qty}</td>
                    <td>{rupiah.format(item.total_harga)}</td>
                    <td><a href={`/flightcartdetail?order_id=${item.id}&username=${item.username}`} onClick={() => this.onLihatClick(item.id)}>Lihat Detail</a></td>
                </tr>
            )
        })
        return listJSXFlight;
    }

    render(){
        return(
            <div id="hero" className="wow fadeIn">
            <div className="hero-container" >
            <div style={{marginTop:"20px", width:"1200px"}}>
                        <table className="table-responsive">
                          <thead className="theadList">
                            <tr>
                              <th>No. Order</th>
                              <th>Tanggal Pemesanan</th>
                              <th>Image</th>
                              <th>Kode Penerbangan</th>
                              <th>Kota Asal</th>
                              <th>Kota Tujuan</th>
                              <th>Jumlah Penumpang</th>
                              <th>Total Harga</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className="tbodyList">
                            {this.renderListCartFlight()}
                          </tbody>
                        </table>
                      </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  console.log(state.auth.username)
  return {
      username: state.auth.username
  }
}

export default connect(mapStateToProps)(ProductFlightCart);