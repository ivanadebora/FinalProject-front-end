import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../supports/css/tablelist.css';
import AdminProductFlightDashboard from './AdminProductFlightDashboard';


class AdminProductFlightManageMaskapai extends Component {

  state = { listMaskapai: [], idSelectedtoEdit: 0, AddFlightImage: 'Pilih Gambar', EditFlightImage: 'Pilih Gambar'}

  componentDidMount() {
    axios.get('http://localhost:1212/flight/listmaskapai')
    .then((res) => {
        this.setState({ listMaskapai: res.data })
        console.log(res.data)
    })
  }

  onBtnAddClick = () => {
    if(document.getElementById("AddFlightImage").files[0] !== undefined) {
      var formData = new FormData()
      var headers = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      var data = {
          nama: this.refs.maskapaiAdd.value,
      }

      if(document.getElementById('AddFlightImage')){
        formData.append('image', document.getElementById('AddFlightImage').files[0])
      }
      formData.append('data', JSON.stringify(data))
      
      axios.post('http://localhost:1212/flight/addmaskapai', formData, headers)
      .then((res) => {
        alert("Berhasil menambahkan satu data maskapai!")
        this.setState({ listMaskapai: res.data })
      })
      .catch((err) =>{
        console.log(err)
      })
    }
    else {
      alert('Image harus diisi!')
    }
  }

  onBtnDeleteClick = (id) => {
    if(window.confirm('Anda yakin ingin menghapus data ini?')) {
      axios.post('http://localhost:1212/flight/deletemaskapai/' + id)
      .then((res) => {
        alert('Berhasil menghapus satu data maskapai!');
        this.setState({ listMaskapai: res.data })
      })
      .catch((err) => {
        alert('Error!')
        console.log(err);
      })
    }
  }

  onBtnUpdateClick = (id) => {
    var formData = new FormData()
    var headers = {
      headers: {'Content-Type': 'multipart/form-data'}
    }

    var data = {
      nama: this.refs.maskapaiEdit.value,
    }

    if(document.getElementById('EditFlightImage')){
      formData.append('image', document.getElementById('EditFlightImage').files[0])
    }
    formData.append('data', JSON.stringify(data))

    axios.post('http://localhost:1212/flight/editmaskapai/' + id, formData, headers)
    .then((res) => {
        alert("Berhasil meng-update satu data maskapai!")
        this.setState({ listMaskapai: res.data, idSelectedtoEdit: 0 })
    })
    .catch((err) =>{
        console.log(err)
    })
  }

  onAddFileImageChange = () => {
    if(document.getElementById("AddFlightImage").files[0] !== undefined) {
      this.setState({AddFlightImage: document.getElementById("AddFlightImage").files[0].name})
    }
    else {
      this.setState({AddFlightImage: 'Pilih Gambar'})
    }
  }

  onEditFileImageChange = () => {
    if(document.getElementById("EditFlightImage").files[0] !== undefined) {
      this.setState({EditFlightImage: document.getElementById("EditFlightImage").files[0].name})
    }
    else {
      this.setState({EditFlightImage: 'Pilih Gambar'})
    }
  }

  renderMaskapaiList = () => {
    var listJSX = this.state.listMaskapai.map((item) => {
      if(item.id === this.state.idSelectedtoEdit) { 
        return (
            <tr>
                <td style={{paddingLeft:"20px"}}></td>
                <td><input type="text" ref="maskapaiEdit" defaultValue={item.nama} style={{width: '200px', fontSize: '16px', paddingLeft:"30px"}}/></td>
                <td><input type="file" id="EditFlightImage" name="EditFlightImage" label={this.state.EditFlightImage} onChange={this.onEditFileImageChange} style={{marginLeft: '20px', width: '80%'}}/></td>
                <td><input type="button" class="btnTable btn-primary" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></td>
                <td><input type="button" class="btnTable btn-success" value="Update" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
            </tr>
        )
      }
      return (
        <tr>
            <td style={{paddingLeft:"10px"}}>{item.id}</td>
            <td style={{paddingLeft:"20px"}}>{item.nama}</td>
            <td style={{paddingLeft:"60px"}}><img src={`http://localhost:1212${item.image}`} alt={item.nama} style={{margin: 'auto', height: '30px'}}/></td>
            <td style={{paddingLeft:"50px"}}><input type="button" class="btnTable btn-warning" value="Edit" onClick={() => this.setState({idSelectedtoEdit:item.id})} style={{paddingBottom:"20px"}}/></td>
            <td style={{paddingLeft:"20px"}}><input type="button" class="btnTable btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} style={{paddingBottom:"20px"}}/></td>
        </tr>
      )
    })
    return listJSX
  }


  render() {
    if(this.props.role === 'AdminProduct') {
      return (
        <div id="hero" className="wow fadeIn">
          <div className="container">
            <div style={{ marginLeft: "-10px",fontSize: "16px" }}>
              <style>{"tr{border-top: hidden;}"}</style>
                <div className="row">
                  <div className="col-lg-2">
                    <AdminProductFlightDashboard/>
                  </div>
                  <div className="col-lg-10" style={{ marginTop: "50px", paddingLeft:"120px", width: "100%" }}>
                    <section>
                      <div className="tbl-header" style={{height:"40px"}}>
                        <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                          <thead>
                            <tr>
                              <th style={{paddingLeft:'10px', color:"#fff"}}>ID</th>
                              <th style={{paddingLeft:'20px', color: "#fff"}}>Nama Maskapai</th>
                              <th style={{paddingLeft:'100px', color:"#fff"}}>Logo</th>
                            </tr>
                          </thead>
                        </table>
                        </div>
                          <div className="tbl-content" style={{paddingRight: '6px'}}>
                            <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                              <tbody>
                                {this.renderMaskapaiList()}
                              </tbody>
                            </table>
                          </div>
                          <div className="tbl-header" style={{paddingRight: '6px', backgroundColor:"#bed1cc"}}>
                            <table className= "tabel2" cellPadding={10} cellSpacing={10} border={0}>
                              <tfoot>
                                <tr>
                                  <td style={{paddingLeft:"20px"}}></td>
                                  <td><input type="text" ref="maskapaiAdd" placeholder="Nama Maskapai" style={{width: '200px', fontSize: '16px', paddingLeft:"30px"}}/></td>
                                  <td><input type="file" id="AddFlightImage" name="AddFlightImage" label={this.state.AddFlightImage} onChange={this.onAddFileImageChange} style={{marginLeft: '20px', width: '80%'}}/></td>
                                  <td></td>
                                  <td><input type="button" class="btnTable btn-primary" value="Add" onClick={this.onBtnAddClick} style={{paddingBottom:"20px"}} /></td>
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

export default connect(mapStateToProps)(AdminProductFlightManageMaskapai);