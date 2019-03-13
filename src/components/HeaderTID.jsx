import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { onUserLogout } from '../actions/authAction';


const cookies = new Cookies();

class HeaderTID extends Component {

    onLogoutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('dataUser');
        cookies.remove('dataRole')
    }

    render(){
        // var newRole = cookies.get('dataRole')
        // var newUser = cookies.get('dataUser')
        if(this.props.username === '') {
            return(
                <header id="header" className="header header-hide">
                    <div className="container-full">
                        <div id="logo" className="pull-left">
                            <a href="/"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="font1"><a href="/login">Pesanan Saya</a></li>
                                {/* <li className="menu-has-children"><a href="#product">Produk kami <i className="fa fa-chevron-down"/></a>
                                
                                    <ul>
                                        <li><a href="#hotel">Hotel</a></li>
                                        <li><a href="/flighthome">Penerbangan</a></li>
                                        <li><a href="#entertainment">Aktivitas</a></li>
                                    </ul>
                                </li> */}
                                <li className="menu-has-children"><a href="/flighthome">Pesan Tiket Pesawat <i className="fa fa-plane" /></a></li>
                                <li className="menu-active"><a href="/login">Masuk <i className="fa fa-user"/></a></li>
                            <li className="register"><a href="/register">Daftar</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            );
        }
        else if (this.props.role === "User" && this.props.username !== '') {
            return (
                <header id="header" className="header header-hide">
                    <div className="container">
                        <div id="logo" className="pull-left">
                            <a href="/"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="font1"><a href="#hero">Pesanan Saya <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        
                                        <li><a href="/flightcart">Cart Penerbangan</a></li>
                                       
                                        <li><a href="/flighthistory">Tiket Penerbangan</a></li>
                                    
                                    </ul>
                                    </li>
                                    <li className="menu-has-children"><a href="/flighthome">Pesan Tiket Pesawat <i className="fa fa-plane fa-2x" /></a></li>
                                {/* <li className="menu-has-children"><a href="#product">Produk kami <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li><a href="#flight">Hotel</a></li>
                                        <li><a href="/flighthome">Penerbangan</a></li>
                                        <li><a href="#entertainment">Aktivitas</a></li>
                                    </ul>
                                </li> */}
                                <li className="menu-has-children"><a href="#product">Halo, {this.props.username} <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        {/* <li><a href="#flight">Ubah Profil</a></li> */}
                                        <li onClick={this.onLogoutSelect}><a href="#flight">Keluar</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            );
        }
        else if (this.props.role === "AdminProduct" && this.props.username !== '') {
            return (
                <header id="header" className="header header-hide">
                    <div className="container">
                        <div id="logo" className="pull-left">
                            <a href="/adminproducthome"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="menu-has-children"><a href="#product">Halo, {this.props.username} <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li onClick={this.onLogoutSelect}><a href="#flight">Keluar</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            );
        }
        else if (this.props.role === "AdminPembayaran" && this.props.username !== '') {
            return (
                <header id="header" className="header header-hide">
                    <div className="container">
                        <div id="logo" className="pull-left">
                            <a href="/adminpaymenthome"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="menu-has-children"><a href="#product"><i className="fa fa-bell"/></a></li>
                                <li className="menu-has-children"><a href="#product">Halo, {this.props.username} <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li onClick={this.onLogoutSelect}><a href="#flight">Keluar</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            );
        }
    }
}

const mapStateToProps = (state) => {
    
    return { 
        username: state.auth.username,
        role: state.auth.role
    }
}

export default connect(mapStateToProps, {onUserLogout })(HeaderTID);