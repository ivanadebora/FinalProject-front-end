import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';



const cookie = new Cookies()
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class AdminPaymentFlightManage extends Component {

    state = {listTrans: [], idSelectedtoEdit: 0}

    componentDidMount() {
      this.getListTrans();
    }


    getListTrans = ()  => {
      axios.post( 'http://localhost:1212/flight/paymentgettrans')
      .then((res) => {
          console.log(res.data)
          this.setState({listTrans:res.data})
      })
      .catch((err) => {
          console.log(err)
      })
    }

    onBtnUpdateClick = (id) => {
      var status_transaksi = this.refs.updateStatus.value;

    axios.post('http://localhost:1212/flight/editpaymentstatus/'+id, {
         status_transaksi
    })
    .then((res) => {
        console.log(res)
        alert("Berhasil mengubah status pembayaran!")
        this.setState({ listTrans: res.data, idSelectedtoEdit: 0 })
    
    })
    .catch((err) => {
        console.log(err)
    })
  }
    

    renderListTransFlight = () => {
        var listJSXFlight = this.state.listTrans.map((item) => {
            if(item.id === this.state.idSelectedtoEdit) { 
            return (
                
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{moment(item.tanggal_pesan).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td>{moment(item.tanggal_transaksi).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td>{item.code}</td>
                    <td>{item.departure_city}</td>
                    <td>{item.arrival_city}</td>
                    <td>{moment(item.tanggal).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td>{item.qty}</td>
                    <td>{rupiah.format(item.total_harga)}</td>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '30px'}}/></td>
                    <td><select className="form-control" name="select" ref="updateStatus" defaultValue={item.status_transaksi}>
                        <option value="Menunggu Persetujuan Pembayaran">Menunggu Persetujuan Pembayaran</option>
                        <option value="Pembayaran Berhasil">Pembayaran Berhasil</option>
                        <option value="Pembayaran Ditolak">Pembayaran Ditolak</option></select>
                    </td>
                    <td><input type="button" className="btnTable btn-primary" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></td>
                    <td><input type="button" className="btnTable btn-success" value="Update" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                </tr>
            )
            }
            return(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{moment(item.tanggal_pesan).format('YYYY/MM/DD, h:mm:ss a')}</td>
                <td>{moment(item.tanggal_transaksi).format('YYYY/MM/DD, h:mm:ss a')}</td>
                <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                <td>{item.code}</td>
                <td>{item.departure_city}</td>
                <td>{item.arrival_city}</td>
                <td>{moment(item.tanggal).format('DD/MM/YYYY')}</td>
                <td>{item.qty}</td>
                <td>{rupiah.format(item.harga)}</td>
                <td>{rupiah.format(item.total_harga)}</td>
                <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '30px'}}/></td>
                <td>{item.status_transaksi}</td>
                <td><input type="button" className="btnTable btn-success" value="Edit"  onClick={() => this.setState({idSelectedtoEdit:item.id})}  /></td>
                <td></td>
            </tr>
            )
        })
        return listJSXFlight;
    }

    render(){
      var newRole = cookie.get('dataRole')
      if (newRole === "AdminPembayaran"){
        return(
          <div id="hero" className="wow fadeIn">
          <div className="container">
            <div style={{ marginTop: "40px",fontSize: "16px"}}>
              <style>{"tr{border: hidden;}"}</style>
                <div className="row">
                  <div className="col-lg-12" style={{ paddingLeft:"0px", width: "100%" }}>
                      <table className="table-responsive">
                        <thead className="theadList">
                          <tr>
                            <th>ID</th>
                            <th>Tanggal Pemesanan</th>
                            <th>Tanggal Konfirmasi</th>
                            <th>Maskapai</th>
                            <th>Kode Penerbangan</th>
                            <th>Kota Asal</th>
                            <th>Kota Tujuan</th>
                            <th>Tanggal</th>
                            <th>Jumlah Penumpang</th>
                            <th>Harga/pax</th>
                            <th>Total Pembayaran</th>
                            <th>Bukti</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="tbodyList">
                          {this.renderListTransFlight()}
                        </tbody>
                        </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
      )
      }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
  console.log(state.auth.username)
  return {
      username: state.auth.username,
      role: state.auth.role
  }
}

export default connect(mapStateToProps)(AdminPaymentFlightManage);