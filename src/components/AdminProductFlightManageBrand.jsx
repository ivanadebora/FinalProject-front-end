import React, { Component } from 'react';
import axios from 'axios';
import '../supports/css/tablelist.css';


class AdminProductFlightManageBrand extends Component {

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
                <td></td>
                <td><center><input type="text" ref="maskapaiEdit" defaultValue={item.nama} /></center></td>
                <td><center><input type="file" id="EditFlightImage" name="EditFlightImage" label={this.state.EditFlightImage} onChange={this.onEditFileImageChange} /></center></td>
                <td><center><input type="button" class="btnTable btn-primary" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></center></td>
                <td><center><input type="button" class="btnTable btn-success" value="Update" onClick={() => this.onBtnUpdateClick(item.id)} /></center></td>
            </tr>
        )
      }
      return (
        <tr>
            <td><center>{item.id}</center></td>
            <td><center>{item.nama}</center></td>
            <td><center><img src={`http://localhost:1212/flight/listmaskapai${item.image}`} alt={item.nama} style={{width: "50px"}}/></center></td>
            <td><center><input type="button" class="btnTable btn-warning" value="Edit" onClick={() => this.setState({idSelectedtoEdit:item.id})} /></center></td>
            <td><center><input type="button" class="btnTable btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></center></td>
        </tr>
      )
    })
    return listJSX
  }


  render() {
    return (
      <div id="hero" className="wow fadeIn">
        <div className="hero-container">
          <section>
            <div className="tbl-header" style={{paddingRight: '6px'}}>
              <table cellPadding={0} cellSpacing={0} border={0}>
                <thead>
                  <tr>
                    <th><center>ID</center></th>
                    <th><center>Nama Maskapai</center></th>
                    <th><center>Logo</center></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                  {this.renderMaskapaiList()}
                </tbody>
              </table>
            </div>
            <div className="tbl-header" style={{paddingRight: '6px'}}>
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tfoot>
                  <tr>
                    <td></td>
                    <td><center><input type="text" ref="maskapaiAdd" placeholder="Nama Maskapai"/></center></td>
                    <td><center><input type="file" id="AddFlightImage" name="AddFlightImage" label={this.state.AddFlightImage} onChange={this.onAddFileImageChange} /></center></td>
                    <td><center><input type="button" class="btnTable btn-primary" value="Add" onClick={this.onBtnAddClick} /></center></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AdminProductFlightManageBrand;