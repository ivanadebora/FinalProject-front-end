import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import moment from 'moment';
import '../supports/css/tablelist.css';
import { rupiahConverter } from '../actions'
import AdminProductFlightDashboard from './AdminProductFlightDashboard';

const cookie = new Cookies()
class AdminProductFlightManage extends Component {

  state = { listProductFlight: [], listMaskapai: [], idSelectedtoEdit: 0}

  componentDidMount() {
    this.getListMaskapai();
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

  renderProductList = () => {
    var listJSX = this.state.listProductFlight.map(({
      id, code, nama, departure_city, arrival_city, tanggal, departure_time, arrival_time,
      departure_terminal, arrival_terminal, seat_class, harga, jumlah_seat, description 
    }) => {
      if(id === this.state.idSelectedtoEdit) { 
        return (
            <tr>
                <td style={{paddingLeft:'10px'}}></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="codeEdit" placeholder="Kode Penerbangan" defaultValue={code} style={{ fontSize: '12px', width:'90%', textAlign: "justify" }}/></td>
                <td style={{paddingLeft:'10px'}}><select className="custom-select" id="inputGroupSelect01" ref="maskapaiEdit" defaultValue={nama} style={{ fontSize: '15px', width: '90%', height: '60%'}}>{this.renderMaskapai()}</select></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="depCityEdit" placeholder="Kota Asal" defaultValue={departure_city} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="arrCityEdit" placeholder="Kota Tujuan" defaultValue={arrival_city} style={{ fontSize: '12px', width:'90%', textAlign: "justify" }} /></td>
                <td style={{paddingLeft:'10px'}}><input type="date" ref="dateEdit" defaultValue={tanggal} style={{ fontSize: '12px', width:'90%', textAlign: "justify" }}/></td>
                <td style={{paddingLeft:'10px'}}><input type="time" name="depTimeEdit" ref="depTimeEdit" defaultValue={departure_time} style={{ fontSize: '12px', width:'90%', textAlign: "justify" }} /></td>
                <td style={{paddingLeft:'10px'}}><input type="time" name="arrTimeEdit" ref="arrTimeEdit" defaultValue={arrival_time} style={{ fontSize: '12px', width:'90%', textAlign: "justify" }} /></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="depTerminalEdit" placeholder="Terminal Keberangkatan"  defaultValue={departure_terminal} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="arrTerminalEdit" placeholder="Terminal Kedatangan" defaultValue={arrival_terminal} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="text" ref="classEdit" placeholder="Kelas" defaultValue={seat_class} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="number" ref="hargaEdit" placeholder="Harga/pax" defaultValue={harga} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="number" ref="seatEdit" placeholder="Jumlah Seat" defaultValue={jumlah_seat} style={{ fontSize: '12px', width:'90%', textAlign: "justify"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="textarea" ref="descEdit" placeholder="Deskripsi" defaultValue={description} style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                <td style={{paddingLeft:'10px'}}><input type="button" class="btnTable btn-primary" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></td>
                <td style={{paddingLeft:'10px'}}><input type="button" class="btnTable btn-success" value="Update" onClick={() => this.onBtnUpdateClick(id)} /></td>
            </tr>
        )
      }
      return (
        <tr>
            <td style={{paddingLeft:'10px'}}>{id}</td>
            <td style={{paddingLeft:'10px'}}>{code}</td>
            <td style={{paddingLeft:'100px'}}>{nama}</td>
            <td style={{paddingLeft:'100px'}}>{departure_city}</td>
            <td style={{paddingLeft:'140px'}}>{arrival_city}</td>
            <td style={{paddingLeft:'100px'}}>{moment(tanggal).format("DD MMMM YYYY")}</td>
            <td style={{paddingLeft:'100px'}}>{departure_time}</td>
            <td style={{paddingLeft:'150px'}}>{arrival_time}</td>
            <td style={{paddingLeft:'150px'}}>{departure_terminal}</td>
            <td style={{paddingLeft:'110px'}}>{arrival_terminal}</td>
            <td style={{paddingLeft:'120px'}}>{seat_class}</td>
            <td style={{paddingLeft:'120px'}}>{this.props.rupiahConverter(harga)}</td>
            <td style={{paddingLeft:'150px'}}>{jumlah_seat}</td>
            <td style={{paddingLeft:'100px'}}>{description}</td>
            <td style={{paddingLeft:'300px'}}><input type="button" class="btnTable btn-warning" value="Edit" onClick={() => this.setState({idSelectedtoEdit:id})} /></td>
            <td style={{paddingLeft:'10px'}}><input type="button" class="btnTable btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
        </tr>
      )
    })
    return listJSX
  }

  render() {
    var newRole = cookie.get('dataRole')
    if(newRole === 'AdminProduct'){
      return (
        <div id="hero" className="wow fadeIn">
            <div className="container">
              <div style={{ marginTop: "40px",fontSize: "16px"}}>
                <style>{"tr{border: hidden;}"}</style>
                  <div className="row">
                    <div className="col-lg-2" style={{ marginTop: "-50px", marginLeft:"-30px"}}>
                      <AdminProductFlightDashboard/>
                    </div>
                    <div className="col-lg-10" style={{ paddingLeft:"120px", width: "3000px" }}>
                    <section>
                      <div className="tbl-header" style={{height:"40px", width: "3000px"}}>
                        <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                          <thead>
                            <tr>
                            <th style={{paddingLeft:'10px', color:"#fff"}}>ID</th>
                              <th style={{paddingLeft:'10px', color:"#fff"}}>Kode Pesawat</th>
                              <th style={{paddingLeft:'70px', color:"#fff"}}>Nama Maskapai</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Kota Asal</th>
                              <th style={{paddingLeft:'130px', color:"#fff"}}>Kota Tujuan</th>
                              <th style={{paddingLeft:'150px', color:"#fff"}}>Tanggal</th>
                              <th style={{paddingLeft:'100px', color:"#fff"}}>Waktu Keberangkatan</th>
                              <th style={{paddingLeft:'50px', color:"#fff"}}>Waktu Kedatangan</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Terminal Keberangkatan</th>
                              <th style={{paddingLeft:'20px', color:"#fff"}}>Terminal Kedatangan</th>
                              <th style={{paddingLeft:'80px', color:"#fff"}}>Kelas</th>
                              <th style={{paddingLeft:'180px', color:"#fff"}}>Harga</th>
                              <th style={{paddingLeft:'180px', color:"#fff"}}>Jumlah Seat</th>
                              <th style={{paddingLeft:'130px', color:"#fff"}}>Deskripsi</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                        </table>
                        </div>
                          <div className="tbl-content" style={{paddingRight: '40px', width: "3000px"}}>
                            <table className= "tabel2" cellPadding={100} cellSpacing={100} border={0}>
                              <tbody>
                              {this.renderProductList()}
                              </tbody>
                            </table>
                          </div>
                          <div className="tbl-header" style={{paddingRight: '6px', backgroundColor:"#bed1cc", width: "3000px"}}>
                            <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                              <tfoot>
                                <tr>
                                <td><input type="text" ref="codeAdd" placeholder="Kode Penerbangan" style={{ fontSize: '12px', width:'90%', paddingLeft:"15px" }}/></td>
                              <td><select className="custom-select" id="inputGroupSelect01" ref="maskapaiAdd" style={{ fontSize: '15px', width: '90%', height: '60%'}}>{this.renderMaskapai()}</select></td>
                              <td><input type="text" ref="depCityAdd" placeholder="Kota Asal" style={{ fontSize: '12px', width:'90%', textAlign: "center"}} /></td>
                              <td><input type="text" ref="arrCityAdd" placeholder="Kota Tujuan" style={{ fontSize: '12px', width:'90%', textAlign: "center" }} /></td>
                              <td><input type="date" ref="dateAdd" id="date" style={{ fontSize: '12px', width:'90%', textAlign: "justify" }}/></td>
                              <td><input type="time" min="00:00:00" max="23:59:00" name="depTimeAdd" ref="depTimeAdd" style={{ fontSize: '12px', width:'90%', justifyContent: "center", paddingLeft:'120px'}} /></td>
                              <td><input type="time" min="00:00:00" max="23:59:00" name="arrTimeAdd" ref="arrTimeAdd" style={{ fontSize: '12px', width:'90%', textAlign: "center" , paddingLeft:'120px'}} /></td>
                              <td><input type="text"  ref="depTerminalAdd" placeholder="Terminal" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td><input type="text" ref="arrTerminalAdd" placeholder="Terminal" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td><input type="text" ref="classAdd" placeholder="Kelas" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td><input type="number" ref="hargaAdd" placeholder="Harga/pax" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td><input type="number" ref="seatAdd" placeholder="Jumlah Seat" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td><input type="textarea" ref="descAdd" placeholder="Deskripsi" style={{ fontSize: '12px', width:'80%', textAlign: "center"}} /></td>
                              <td></td>
                              <td><input type="button" class="btnTable btn-primary" value="Add" onClick={this.onBtnAddClick} /></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </section>
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