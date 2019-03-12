import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Pagination from 'react-js-pagination';
import AdminProductFlightSideBarMenu from './AdminProductFlightSideBarMenu';

const cookie = new Cookies()
class AdminProductFlightManageMaskapai extends Component {

  state = { listMaskapai: [], listFilterMaskapai:[], idSelectedtoEdit: 0, AddFlightImage: 'Pilih Gambar', EditFlightImage: 'Pilih Gambar',  activePage: 1, itemPerPage: 5}

  componentDidMount() {
    axios.get('http://localhost:1212/admin/flight/product/listmaskapai')
    .then((res) => {
        this.setState({ listMaskapai: res.data, listFilterMaskapai: res.data })
        console.log(res.data)
    })
  }
  
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  onBtnSearchClick = () => {
    var nama = this.refs.maskapaiFilter.value || ''

    var arrSearch = this.state.listMaskapai.filter((item) => {
        return (item.nama.toLowerCase().includes(nama.toLowerCase()))
    })
    this.setState({listFilterMaskapai: arrSearch})
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
      
      axios.post('http://localhost:1212/admin/flight/product/addmaskapai', formData, headers)
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
      axios.post('http://localhost:1212/admin/flight/product/deletemaskapai/' + id)
      .then((res) => {
        alert('Berhasil menghapus satu data maskapai!');
        this.setState({ listMaskapai: res.data, listFilterMaskapai: res.data })
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

    axios.post('http://localhost:1212/admin/flight/product/editmaskapai/' + id, formData, headers)
    .then((res) => {
        alert("Berhasil meng-update satu data maskapai!")
        this.setState({ listMaskapai: res.data, listFilterMaskapai: res.data, idSelectedtoEdit: 0 })
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
    var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    var renderedProjects =  this.state.listFilterMaskapai.slice(indexOfFirstTodo, indexOfLastTodo);

    var listJSX = renderedProjects.map((item, index) => {
      if(item.id === this.state.idSelectedtoEdit) { 
        return (
            <tr key={index}>
                <td style={{paddingLeft:"20px"}}></td>
                <td><input type="text" ref="maskapaiEdit" defaultValue={item.nama} style={{width: '200px', fontSize: '16px', paddingLeft:"30px"}}/></td>
                <td><input type="file" id="EditFlightImage" name="EditFlightImage" label={this.state.EditFlightImage} onChange={this.onEditFileImageChange} style={{marginLeft: '20px', width: '80%'}}/></td>
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
            </tr>
        )
      }
      return (
        <tr>
            <td>{item.id}</td>
            <td>{item.nama}</td>
            <td><img src={`http://localhost:1212${item.image}`} alt={item.nama} style={{margin: 'auto', height:50}}/></td>
            <td><table className="table table-borderless table-sm">
                <tr>
                    <td>
                    <button className="btn btn-info" 
                        onClick={() => this.setState({idSelectedtoEdit:item.id})} style={{borderRadius:5}}>
                        <i className="fa fa-edit"></i>
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger"
                        onClick={() => this.onBtnDeleteClick(item.id)} style={{borderRadius:5}}>
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
    const newRole = cookie.get('dataRole')
    if(newRole === 'AdminProduct') {
      return (
        <div style={{ fontSize: "13px", marginTop:0, marginLeft:0 }}>
                <div style={{ padding: "10px" }}>
                    <div className="row">
                        <div className="col-lg-2" >
                            <AdminProductFlightSideBarMenu />
                        </div>
                        <div className="col-lg-10 card bg-light" style={{ padding: "20px" }}>
                        <h2>Manage Daftar Maskapai</h2>
                        <br/>
                        <h3 style={{ fontSize: "18px", fontWeight:'bold'}} >Search Maskapai: </h3>
                        <input type="text"  style={{width:250, fontSize:13, fontWeight:'normal'}} ref="maskapaiFilter"  placeholder="Nama Maskapai"/><br/>
                        <button className="btn btn-primary"
                                    style={{backgroundColor:"#0a0851", borderRadius:5, marginBottom:10, width:150, height:30, paddingTop:3}} 
                                    onClick={this.onBtnSearchClick.bind(this)}>
                                    <i className="fa fa-search fa-2x"  /> Search
                          </button>
                        <div style={{ fontSize: "13px" }} className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="table-responsive-lg">
                        <table className="table table-bordered table-hover">
                            <thead style={{backgroundColor:"#0a0851"}}>
                                <tr>
                                    <th style={{color:"#fff"}}><center>ID</center></th>
                                    <th style={{color:"#fff"}}><center>Nama Maskapai</center></th>
                                    <th style={{color:"#fff"}}><center>Logo</center></th>
                                    <th style={{color:"#fff"}}><center>Action</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.renderMaskapaiList()}
                            </tbody>
                            <tfoot>
                    <tr>
                        <td></td>
                        <td><input type="text" size="8" placeholder="Nama Maskapai" ref="maskapaiAdd" style={{ fontSize: "12px" }} 
                            className="form-control" /></td>
                        <td><input type="file" size="8"  id="AddFlightImage" name="AddFlightImage" label={this.state.AddFlightImage} onChange={this.onAddFileImageChange} style={{ fontSize: "12px" }}
                            className="form-control"/></td>
                        <td colSpan="3"><center><button className="btn btn-success" style={{ fontSize: "12px", borderRadius:5 }}
                        onClick={this.onBtnAddClick} >
                            <i className="fa fa-plus"></i> Add</button></center></td>
                    </tr>
                </tfoot>
                        </table>
                        <center><Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.listFilterMaskapai.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        /></center>
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

export default connect(mapStateToProps)(AdminProductFlightManageMaskapai);