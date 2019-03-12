import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import AdminPaymentFlightSideBarMenu from './AdminPaymentFlightSideBarMenu';



const cookie = new Cookies()
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })

class AdminPaymentFlightManage extends Component {

    state = {listTrans: [], listFilterTrans:[], idSelectedtoEdit: 0, activePage: 1, itemPerPage: 5}

    componentDidMount() {
      this.getListTrans();
    }


    getListTrans = ()  => {
      axios.post( 'http://localhost:1212/flight/paymentgettrans')
      .then((res) => {
          console.log(res.data)
          this.setState({listTrans:res.data, listFilterTrans:res.data})
      })
      .catch((err) => {
          console.log(err)
      })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    onBtnSearchClick = () => {
        var kode_booking = parseInt(this.refs.kodeBookingFilter.value) || ''

        var arrSearch = this.state.listTrans.filter((item) => {
            return (item.kode_booking.includes(kode_booking))
        })
        this.setState({listFilterTrans: arrSearch})
    }

    onBtnUpdateClick = (id) => {
      var status_transaksi = this.refs.updateStatus.value;

        axios.post('http://localhost:1212/flight/editpaymentstatus/'+id, {
            status_transaksi
        })
        .then((res) => {
            console.log(res)
            alert("Berhasil mengubah status pembayaran!")
            this.setState({ listTrans: res.data, listFilterTrans:[], idSelectedtoEdit: 0 })
        
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAccepted = (id) => {
        axios.post('http://localhost:1212/flight/acceptedmailsend/'+id)
        .then((res) => {
            console.log(res)
            alert("Email berhasil dikirim!")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnDenied = (id) => {
        axios.post('http://localhost:1212/flight/deniedmailsend/'+id)
        .then((res) => {
            console.log(res)
            alert("Email berhasil dikirim!")
            axios.post('http://localhost:1212/flight/stockupdate/'+id)
            .then((res) => {
                alert("Jumlah seat telah di-update!")
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    

    renderListTransFlight = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects =  this.state.listFilterTrans.slice(indexOfFirstTodo, indexOfLastTodo);

        var listJSXFlight = renderedProjects.map((item, index) => {
            if(item.id === this.state.idSelectedtoEdit) { 
            return (
                
                <tr key={index}>
                    <td style={{fontSize:14}}>{item.id}</td>
                    <td style={{fontSize:14}}>{item.username}</td>
                    <td style={{fontSize:14}}>{item.kode_booking}</td>
                    <td style={{fontSize:14}}>{moment(item.tanggal_pesan).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td style={{fontSize:14}}>{moment(item.tanggal_transaksi).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '20px'}}/></td>
                    <td style={{fontSize:14}}>{item.code}</td>
                    <td style={{fontSize:14}}>{item.departure_city}</td>
                    <td style={{fontSize:14}}>{item.arrival_city}</td>
                    <td style={{fontSize:14}}>{moment(item.tanggal).format('YYYY-MM-DD h:mm:ss')}</td>
                    <td style={{fontSize:14}}>{item.qty}</td>
                    <td style={{fontSize:14}}>{rupiah.format(item.harga)}</td>
                    <td style={{fontSize:14}}>{rupiah.format(item.total_harga)}</td>
                    <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '20px', width:'30px'}}/></td>
                    <td style={{fontSize:14}}><select className="custom-select" id="inputGroupSelect01" name="select" ref="updateStatus" defaultValue={item.status_transaksi} style={{width:300}}>
                        <option value="Menunggu Persetujuan Pembayaran">Menunggu Persetujuan Pembayaran</option>
                        <option value="Pembayaran Berhasil">Pembayaran Berhasil</option>
                        <option value="Pembayaran Ditolak">Pembayaran Ditolak</option></select>
                    </td>
                    <td><table className="table table-borderless table-sm">
                    <center>
                    <button className="btn btn-success"
                        onClick={() => this.onBtnUpdateClick(item.id)} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-save"></i>
                    </button>
                    <button className="btn btn-secondary"
                        onClick={() => this.setState({ idSelectedtoEdit: 0 })} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-times"></i>
                    </button>
                    </center>
                </table></td>
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-success" 
                        onClick={() => this.onBtnAccepted(item.id)} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-envelope"></i> Accepted
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger" 
                        onClick={() => this.onBtnDenied(item.id)} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-envelope"></i> Denied
                    </button>
                    </td>
                </tr>
            </table></td>
                </tr>
            )
            }
            return(
                <tr key={item.id}>
                <td style={{fontSize:14}}>{item.id}</td>
                <td style={{fontSize:14}}>{item.username}</td>
                <td style={{fontSize:14}}>{item.kode_booking}</td>
                <td style={{fontSize:14}}>{moment(item.tanggal_pesan).format('YYYY/MM/DD, h:mm:ss')}</td>
                <td style={{fontSize:14}}>{moment(item.tanggal_transaksi).format('YYYY/MM/DD, h:mm:ss')}</td>
                <td><img src={`http://localhost:1212${item.image_maskapai}`} alt={item.nama} style={{margin: 'auto', height: '20px'}}/></td>
                <td style={{fontSize:14}}>{item.code}</td>
                <td style={{fontSize:14}}>{item.departure_city}</td>
                <td style={{fontSize:14}}>{item.arrival_city}</td>
                <td style={{fontSize:14}}>{moment(item.tanggal).format('DD/MM/YYYY')}</td>
                <td style={{fontSize:14}}>{item.qty}</td>
                <td style={{fontSize:14}}>{rupiah.format(item.harga)}</td>
                <td style={{fontSize:14}}>{rupiah.format(item.total_harga)}</td>
                <td><img src={`http://localhost:1212${item.image}`} alt={item.id} style={{margin: 'auto', height: '20px', width:'30px'}}/></td>
                <td style={{fontSize:14}}>{item.status_transaksi}</td>
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-info" 
                        onClick={() => this.setState({idSelectedtoEdit:item.id})} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-edit"></i>
                    </button>
                    </td>
                </tr>
            </table></td>
                <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-success" 
                        onClick={() => this.onBtnAccepted(item.id)} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-envelope"></i> Accepted
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger" 
                        onClick={() => this.onBtnDenied(item.id)} style={{borderRadius:5, height:20}}>
                        <i className="fa fa-envelope"></i> Denied
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
          <div style={{ fontSize: "13px", marginTop:0, marginLeft:10, marginRight:10 }}>
                <div style={{ padding: "20px" }}>
                    <div className="row">
                        <div >
                            <AdminPaymentFlightSideBarMenu />
                        </div>
                        <div className="card bg-light" style={{marginLeft:-900, width:600}}>
                        
                            <center><div className="form" style={{marginTop:20}}>
                                <h3 style={{fontSize:16, fontWeight:'bold', marginBottom:5}}>Masukkan kode booking: </h3>
                                <input type="number"  style={{width:250}} ref="kodeBookingFilter"  placeholder="Kode Booking"/>
                                <br/>
                                <button className="btn btn-primary"
                                    style={{backgroundColor:"#0a0851", borderRadius:5, marginBottom:10}} 
                                    onClick={this.onBtnSearchClick.bind(this)}>
                                    <i className="fa fa-search fa-2x"  /> Search
                                </button>
                            </div></center>
                        </div>
                        <br/>
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
                                    <th style={{color:"#fff"}}><center>Kode Booking</center></th>
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
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.listFilterTrans.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
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
  return {
      username: state.auth.username,
      role: state.auth.role
  }
}

export default connect(mapStateToProps)(AdminPaymentFlightManage);