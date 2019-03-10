import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';
import '../supports/css/tablelist.css';
import { rupiahConverter } from '../actions'
import AdminProductFlightSideBarMenu from './AdminProductFlightSideBarMenu';

const cookie = new Cookies()
class AdminProductFlightManage extends Component {

  state = { listProductFlight: [], listMaskapai: [], listKota: [], idSelectedtoEdit: 0}

  componentDidMount() {
    this.getListMaskapai();
    this.getListKota();
    axios.get('http://localhost:1212/flight/listproduct')
    .then((res) => {
        this.setState({ listProductFlight: res.data })
        console.log(res.data)
    })
  }

  getListMaskapai = () => {
    axios.get('http://localhost:1212/flight/listmaskapai')
    .then((res) => {
        this.setState({ listMaskapai: res.data })
        console.log(res.data)
    })
  }

  getListKota = () => {
    axios.get('http://localhost:1212/flight/listkota')
    .then((res) => {
        this.setState({ listKota: res.data })
        console.log(res.data)
    })
}

  onBtnAddClick = () => {
      var code = this.refs.codeAdd.value;
      var nama = this.refs.maskapaiAdd.value;
      var departure_city = this.refs.depCityAdd.value;
      var arrival_city = this.refs.arrCityAdd.value;
      var tanggal = this.refs.dateAdd.value;
      var departure_time = this.refs.depTimeAdd.value;
      var arrival_time = this.refs.arrTimeAdd.value;
      var departure_terminal = this.refs.depTerminalAdd.value;
      var arrival_terminal = this.refs.arrTerminalAdd.value;
      var seat_class = this.refs.classAdd.value;
      var harga = this.refs.hargaAdd.value;
      var jumlah_seat = this.refs.seatAdd.value;
      var description = this.refs.descAdd.value;

      axios.post('http://localhost:1212/flight/addproduct', {
        code, nama, departure_city, arrival_city, tanggal, departure_time, arrival_time,
        departure_terminal, arrival_terminal, seat_class, harga, jumlah_seat, description 
      })
      .then((res) => {
        alert("Berhasil menambahkan satu data maskapai!")
        this.setState({ listProductFlight: res.data })
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  onBtnDeleteClick = (id) => {
    if(window.confirm('Anda yakin ingin menghapus data ini?')) {
      axios.post('http://localhost:1212/flight/deleteproduct/' + id)
      .then((res) => {
        alert('Berhasil menghapus satu data maskapai!');
        this.setState({ listProductFlight: res.data })
      })
      .catch((err) => {
        alert('Error!')
        console.log(err);
      })
    }
  }

  onBtnUpdateClick= (id) => {
      var code = this.refs.codeEdit.value;
      var nama = this.refs.maskapaiEdit.value;
      var departure_city = this.refs.depCityEdit.value;
      var arrival_city = this.refs.arrCityEdit.value;
      var tanggal = this.refs.dateEdit.value;
      var departure_time = this.refs.depTimeEdit.value;
      var arrival_time = this.refs.arrTimeEdit.value;
      var departure_terminal = this.refs.depTerminalEdit.value;
      var arrival_terminal = this.refs.arrTerminalEdit.value;
      var seat_class = this.refs.classEdit.value;
      var harga = this.refs.hargaEdit.value;
      var jumlah_seat = this.refs.seatEdit.value;
      var description = this.refs.descEdit.value;

    axios.post('http://localhost:1212/flight/editproduct/'+id, {
        code, nama, departure_city, arrival_city, tanggal, departure_time, arrival_time,
        departure_terminal, arrival_terminal, seat_class, harga, jumlah_seat, description 
    })
    .then((res) => {
        console.log(res)
        alert("Berhasil mengubah satu data maskapai!")
        this.setState({ listProductFlight: res.data, idSelectedtoEdit: 0 })
    
    })
    .catch((err) => {
        console.log(err)
    })
}

  renderMaskapai = () => {
    var listJSXMaskapai = this.state.listMaskapai.map((item) => {
      return (
              <option value={item.nama}>{item.nama}</option>
      )
    })
    return listJSXMaskapai
  }

  renderKota = () => {
    var listJSXKota = this.state.listKota.map((item) => {
      return (
              <option value={item.nama_kota}>{item.nama_kota}</option>
      )
    })
    return listJSXKota
  }

  renderProductList = () => {
    var listJSX = this.state.listProductFlight.map(({
      id, code, nama, departure_city, arrival_city, tanggal, departure_time, arrival_time,
      departure_terminal, arrival_terminal, seat_class, harga, jumlah_seat, description 
    }) => {
      if(id === this.state.idSelectedtoEdit) { 
        return (
            <tr>
                <td></td>
                <td><input type="text" ref="codeEdit" defaultValue={code} style={{ fontSize: '12px'}}/></td>
                <td><select className="custom-select" id="inputGroupSelect01" ref="maskapaiEdit" defaultValue={nama} style={{ fontSize: '12px'}}>{this.renderMaskapai()}</select></td>
                <td><select className="custom-select" id="inputGroupSelect01" ref="depCityEdit" defaultValue={departure_city} style={{ fontSize: '12px'}}>{this.renderKota()}</select></td>
                <td><select className="custom-select" id="inputGroupSelect01" ref="arrCityEdit" defaultValue={arrival_city} style={{ fontSize: '12px'}}>{this.renderKota()}</select></td>
                <td><input type="date" ref="dateEdit" defaultValue={tanggal} style={{ fontSize: '12px'}}/></td>
                <td><input type="time" name="depTimeEdit" ref="depTimeEdit" defaultValue={departure_time} style={{ fontSize: '12px'}} /></td>
                <td><input type="time" name="arrTimeEdit" ref="arrTimeEdit" defaultValue={arrival_time} style={{ fontSize: '12px'}} /></td>
                <td><input type="text" ref="depTerminalEdit" defaultValue={departure_terminal} style={{ fontSize: '12px'}} /></td>
                <td><input type="text" ref="arrTerminalEdit" defaultValue={arrival_terminal} style={{ fontSize: '12px'}} /></td>
                <td><select className="custom-select" id="inputGroupSelect01" ref="classEdit" defaultValue={seat_class} style={{ fontSize: '12px'}} >
                <option value="Ekonomi">Ekonomi</option>
                <option value="Bisnis">Bisnis</option>
                </select></td>
                <td><input type="number" ref="hargaEdit" defaultValue={harga} style={{ fontSize: '12px'}} /></td>
                <td><input type="number" ref="seatEdit" defaultValue={jumlah_seat} style={{ fontSize: '12px'}} /></td>
                <td><textarea className="form-control" id="description" ref="descEdit" placeholder={description} defaultValue={description} style={{ fontSize: '12px'}} /></td>
                <td>
                    <center>
                    <button className="btn btn-success"
                        onClick={() => this.onBtnUpdateClick(id)} style={{borderRadius:5}}>
                        <i className="fa fa-save"></i>
                    </button>
                    &nbsp;
                    <button className="btn btn-secondary"
                        onClick={() => this.setState({ idSelectedtoEdit: 0 })} style={{borderRadius:5}}>
                        <i className="fa fa-times"></i>
                    </button>
                    </center>
                </td>
            </tr>
        )
      }
      return (
        <tr>
            <td style={{fontSize:12}}>{id}</td>
            <td style={{fontSize:12}}>{code}</td>
            <td style={{fontSize:12}}>{nama}</td>
            <td style={{fontSize:12}}>{departure_city}</td>
            <td style={{fontSize:12}}>{arrival_city}</td>
            <td style={{fontSize:12}}>{moment(tanggal).format("DD MMMM YYYY")}</td>
            <td style={{fontSize:12}}>{departure_time}</td>
            <td style={{fontSize:12}}>{arrival_time}</td>
            <td style={{fontSize:12}}>{departure_terminal}</td>
            <td style={{fontSize:12}}>{arrival_terminal}</td>
            <td style={{fontSize:12}}>{seat_class}</td>
            <td style={{fontSize:12}}>{this.props.rupiahConverter(harga)}</td>
            <td style={{fontSize:12}}>{jumlah_seat}</td>
            <td style={{fontSize:12}}>{description}</td>
            <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-info" 
                        onClick={() => this.setState({idSelectedtoEdit:id})} style={{borderRadius:5}}>
                        <i className="fa fa-edit"></i>
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger"
                        onClick={() => this.onBtnDeleteClick(id)} style={{borderRadius:5}}>
                        <i className="fa fa-trash"></i>
                    </button>
                    </td>
                </tr>
            </table></td>
        </tr>
      )
    })
    return listJSX
  }

  render() {
    var newRole = cookie.get('dataRole')
    if(newRole === 'AdminProduct'){
      return (
        <div style={{ fontSize: "13px", marginTop:70, marginLeft:10, marginRight:10 }}>
                <div style={{ padding: "20px" }}>
                    <div className="row">
                        <div>
                            <AdminProductFlightSideBarMenu />
                        </div>
                        <div style={{ padding: "20px"}}>
                        <h2>Manage Product</h2>
                        <br/>
                        <div style={{ fontSize: "13px" }} className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead style={{backgroundColor:"#0a0851"}}>
                                <tr>
                                    <th style={{fontSize:14, color:"#fff"}}><center>ID</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Kode Pesawat</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Nama Maskapai</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Kota Asal</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Kota Tujuan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Tanggal Keberangkatan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Waktu Keberangkatan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Waktu Kedatangan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Terminal Keberangkatan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Terminal Kedatangan</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Kelas</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Harga</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Jumlah Seat</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Deskripsi</center></th>
                                    <th style={{fontSize:14, color:"#fff"}}><center>Action</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.renderProductList()}
                            </tbody>
                            <tfoot>
                    <tr>
                      <td></td>
                    <td><input type="text" ref="codeAdd" placeholder="Kode" style={{ fontSize: '12px', width:150}}/></td>
                              <td><select className="custom-select" id="inputGroupSelect01" ref="maskapaiAdd" style={{ fontSize: '12px', width:150}}>{this.renderMaskapai()}</select></td>
                              <td><select className="custom-select" id="inputGroupSelect01" ref="depCityAdd" placeholder="Kota Asal" style={{ fontSize: '12px', width:150}} >{this.renderKota()}</select></td>
                              <td><select className="custom-select" id="inputGroupSelect01" ref="arrCityAdd" placeholder="Kota Tujuan" style={{ fontSize: '12px', width:150}} >{this.renderKota()}</select></td>
                              <td><input type="date" ref="dateAdd" id="date" style={{ fontSize: '12px'}}/></td>
                              <td><input type="time" min="00:00:00" max="23:59:00" name="depTimeAdd" ref="depTimeAdd" style={{ fontSize: '12px'}} /></td>
                              <td><input type="time" min="00:00:00" max="23:59:00" name="arrTimeAdd" ref="arrTimeAdd" style={{ fontSize: '12px'}} /></td>
                              <td><input type="text"  ref="depTerminalAdd" placeholder="Terminal Asal" style={{ fontSize: '12px', width:150}} /></td>
                              <td><input type="text" ref="arrTerminalAdd"  placeholder="Terminal Tiba" style={{ fontSize: '12px', width:150}} /></td>
                              <td><select className="custom-select" id="inputGroupSelect01" ref="classAdd" style={{ fontSize: '12px', width:100}} >
                              <option value="Ekonomi">Ekonomi</option>
                              <option value="Bisnis">Bisnis</option>
                              </select></td>
                              <td><input type="number" ref="hargaAdd" placeholder="Harga/pax" style={{ fontSize: '12px', width:150}} /></td>
                              <td><input type="number" ref="seatAdd"   placeholder="Jumlah Seat" style={{ fontSize: '12px', width:150}} /></td>
                              <td><textarea className="form-control" id="description" placeholder="Description" ref="descAdd"  style={{ fontSize: '12px', width:300}} /></td>
                        <td colSpan="3"><center><button className="btn btn-success" style={{ fontSize: "12px", borderRadius:5 }}
                        onClick={this.onBtnAddClick} >
                            <i className="fa fa-plus"></i> Add</button></center></td>
                    </tr>
                </tfoot>
                        </table>
                    </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
      );
    }
      return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
  console.log(state.auth.role)
  return {
      role: state.auth.role
  };
}


export default connect(mapStateToProps, {rupiahConverter})(AdminProductFlightManage);