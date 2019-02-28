import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import Cookies from 'universal-cookie';

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
        var listJSXFlight = this.state.listHistory.map((item) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{moment(item.tanggal_pesan).format('YYYY-MM-DD, h:mm:ss')}</td>
                    <td>{moment(item.tanggal_transaksi).format('YYYY-MM-DD, h:mm:ss')}</td>
                    <td>{item.status_transaksi}</td>
                    <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td>{item.code}</td>
                    <td>{item.departure_city}</td>
                    <td>{item.arrival_city}</td>
                    <td>{moment(item.tanggal).format('YYYY-MM-DD, h:mm:ss')}</td>
                    <td>{item.qty}</td>
                    <td>{rupiah.format(item.total_harga)}</td>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '30px'}}/></td>
                    <td><a href={`/flight_ticket?ticket_id=${item.id}&username=${item.username}`} onClick={() => this.onLihatClick(item.id)}>Lihat Tiket</a></td>
                </tr>
            )
        })
        return listJSXFlight;
    }

    render(){
        return(
            <div id="hero" className="wow fadeIn" style={{marginTop:"-150px"}}>
            <div className="hero-container" >
            <div style={{marginTop:"20px", width:"1200px"}}>
                        <table className="table-responsive">
                          <thead className="theadList">
                            <tr>
                              <th>No. Tiket</th>
                              <th>Tanggal Pemesanan</th>
                              <th>Tanggal Konfirmasi</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Kode Penerbangan</th>
                              <th>Kota Asal</th>
                              <th>Kota Tujuan</th>
                              <th>Tanggal</th>
                              <th>Jumlah Penumpang</th>
                              <th>Total Harga</th>
                              <th>Bukti Transaksi</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className="tbodyList">
                            {this.renderListHistoryFlight()}
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

export default connect(mapStateToProps)(ProductFlightHistory);