import React, { Component } from 'react';
import axios from 'axios';
import '../supports/css/tablelist.css';


class AdminProductFlightManage extends Component {

  state = { listProductFlight: [], listMaskapai: [], idSelectedtoEdit: 0}

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
                    <th><center>Kode Penerbangan</center></th>
                    <th><center>Nama Maskapai</center></th>
                    <th><center>Asal</center></th>
                    <th><center>Tujuan</center></th>
                    <th><center>Waktu Keberangkatan</center></th>
                    <th><center>Waktu Kedatangan</center></th>
                    <th><center>Terminal Keberangkatan</center></th>
                    <th><center>Terminal Kedatangan</center></th>
                    <th><center>Kelas Penerbangan</center></th>
                    <th><center>Harga/pax</center></th>
                    <th><center>Jumlah Seat</center></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tbody>
              </table>
            </div>
            <div className="tbl-footer" style={{paddingRight: '6px'}}>
              <table cellPadding={0} cellSpacing={0} border={0}>
                <tfoot>
                  <tr>
                    <td></td>
                    <td><center><input type="text" ref="kodeAdd" placeholder="Kode Penerbangan"/></center></td>
                    <td><center><select class="custom-select" id="inputGroupSelect04" ref="maskapaiAdd">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select></center></td>
                    <td><center><input type="text" ref="departureCityAdd" placeholder="Asal"/></center></td>
                    <td><center><input type="text" ref="arrivalCityAdd" placeholder="Tujuan"/></center></td>
                    <td><center><input type="text" ref="departureTimeAdd" placeholder="Waktu Keberangkatan"/></center></td>
                    <td><center><input type="text" ref="arrivalTimeAdd" placeholder="Waktu Kedatangan"/></center></td>
                    <td><center><input type="text" ref="departureTerminalAdd" placeholder="Terminal Keberangkatan"/></center></td>
                    <td><center><input type="text" ref="arrivalTerminalAdd" placeholder="Terminal Kedatangan"/></center></td>
                    <td><center><input type="text" ref="classAdd" placeholder="Kelas Penerbangan"/></center></td>
                    <td><center><input type="number" ref="hargaAdd" placeholder="Harga"/></center></td>
                    <td><center><input type="number" ref="jumlahSeatAdd" placeholder="Jumlah Seat"/></center></td>
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

export default AdminProductFlightManage;