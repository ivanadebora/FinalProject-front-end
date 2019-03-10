import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';
import AdminPaymentFlightSideBarMenu from './AdminPaymentFlightSideBarMenu';



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
                    <td>{item.username}</td>
                    <td>{moment(item.tanggal_pesan).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td>{moment(item.tanggal_transaksi).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
                    <td>{item.code}</td>
                    <td>{item.departure_city}</td>
                    <td>{item.arrival_city}</td>
                    <td>{moment(item.tanggal).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td>{item.qty}</td>
                    <td>{rupiah.format(item.harga)}</td>
                    <td>{rupiah.format(item.total_harga)}</td>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '30px'}}/></td>
                    <td><select className="custom-select" id="inputGroupSelect01" name="select" ref="updateStatus" defaultValue={item.status_transaksi}>
                        <option value="Menunggu Persetujuan Pembayaran">Menunggu Persetujuan Pembayaran</option>
                        <option value="Pembayaran Berhasil">Pembayaran Berhasil</option>
                        <option value="Pembayaran Ditolak">Pembayaran Ditolak</option></select>
                    </td>
                    <td><table className="table table-borderless table-sm">
                    <center>
                    <button className="btn btn-success"
                        onClick={() => this.onBtnUpdateClick(item.id)} style={{borderRadius:5}}>
                        <i className="fa fa-save"></i>
                    </button>
                    &nbsp;
                    <button className="btn btn-secondary"
                        onClick={() => this.setState({ idSelectedtoEdit: 0 })} style={{borderRadius:5}}>
                        <i className="fa fa-times"></i>
                    </button>
                    </center>
                </table></td>
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-success" 
                        onClick="" style={{borderRadius:5}}>
                        <i className="fa fa-envelope"></i> Accepted Mail
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger" 
                        onClick="" style={{borderRadius:5}}>
                        <i className="fa fa-envelope"></i> Denied Mail
                    </button>
                    </td>
                </tr>
            </table></td>
                </tr>
            )
            }
            return(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{moment(item.tanggal_pesan).format('YYYY/MM/DD, h:mm:ss')}</td>
                <td>{moment(item.tanggal_transaksi).format('YYYY/MM/DD, h:mm:ss')}</td>
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
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-info" 
                        onClick={() => this.setState({idSelectedtoEdit:item.id})} style={{borderRadius:5}}>
                        <i className="fa fa-edit"></i>
                    </button>
                    </td>
                </tr>
            </table></td>
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-success" 
                        onClick="" style={{borderRadius:5}}>
                        <i className="fa fa-envelope"></i> Accepted Mail
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger" 
                        onClick="" style={{borderRadius:5}}>
                        <i className="fa fa-envelope"></i> Denied Mail
                    </button>
                    </td>
                </tr>
            </table></td>
            </tr>
            )
        })
        return listJSXFlight;
    }

    render(){
      var newRole = cookie.get('dataRole')
      if (newRole === "AdminPembayaran"){
        return(
          <div style={{ fontSize: "13px", marginTop:70, marginLeft:10, marginRight:10 }}>
                <div style={{ padding: "20px" }}>
                    <div className="row">
                        <div>
                            <AdminPaymentFlightSideBarMenu />
                        </div>
                        <div style={{ padding: "20px" }}>
                        <h2>Manage Flight Transaction</h2>
                        <br/>
                        <div style={{ fontSize: "13px" }} className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="table-responsive-lg">
                        <table className="table table-bordered table-hover">
                            <thead style={{backgroundColor:"#0a0851"}}>
                                <tr>
                                    <th style={{color:"#fff"}}><center>ID Transaksi</center></th>
                                    <th style={{color:"#fff"}}><center>Username</center></th>
                                    <th style={{color:"#fff", width:200}}><center>Tanggal Pemesanan</center></th>
                                    <th style={{color:"#fff"}}><center>Tanggal Konfirmasi</center></th>
                                    <th style={{color:"#fff"}}><center>Maskapai</center></th>
                                    <th style={{color:"#fff"}}><center>Kode Penerbangan</center></th>
                                    <th style={{color:"#fff"}}><center>Kota Asal</center></th>
                                    <th style={{color:"#fff"}}><center>Kota Tujuan</center></th>
                                    <th style={{color:"#fff"}}><center>Tanggal</center></th>
                                    <th style={{color:"#fff"}}><center>Jumlah Penumpang</center></th>
                                    <th style={{color:"#fff"}}><center>Harga/pax</center></th>
                                    <th style={{color:"#fff"}}><center>Total Pembayaran</center></th>
                                    <th style={{color:"#fff"}}><center>Bukti Pembayaran</center></th>
                                    <th style={{color:"#fff"}}><center>Status</center></th>
                                    <th style={{color:"#fff"}}><center>Action</center></th>
                                    <th style={{color:"#fff"}}><center>Kirim Email</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.renderListTransFlight()}
                            </tbody>
                        </table>
                    </div>
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