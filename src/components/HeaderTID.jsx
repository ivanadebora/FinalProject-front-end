import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { onUserLogout } from '../actions/authAction';
import { keepLogin } from '../actions';

const cookies = new Cookies();

class HeaderTID extends Component {

    onLogoutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('dataUser');
    }

    render(){
        if(this.props.username === '') {
            return(
                <header id="header" className="header header-hide">
                    <div className="container-full">
                        <div id="logo" className="pull-left">
                            <a href="/"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="font1"><a href="#hero">Pesanan Saya</a></li>
                                <li className="menu-has-children"><a href="#product">Produk kami <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li><a href="#hotel">Hotel</a></li>
                                        <li><a href="/flighthome">Penerbangan</a></li>
                                        <li><a href="#entertainment">Aktivitas</a></li>
                                    </ul>
                                </li>
                                <li className="menu-active"><a href="/login">Masuk <i className="fa fa-user"/></a></li>
                            <li className="register"><a href="/register">Daftar</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            );
        }
            return (
                <header id="header" className="header header-hide">
                    <div className="container">
                        <div id="logo" className="pull-left">
                            <a href="/"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li className="font1"><a href="#hero">Pesanan Saya</a></li>
                                <li className="menu-has-children"><a href="#product">Produk kami <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li><a href="#flight">Hotel</a></li>
                                        <li><a href="/flighthome">Penerbangan</a></li>
                                        <li><a href="#entertainment">Aktivitas</a></li>
                                    </ul>
                                </li>
                                <li className="menu-has-children"><a href="#product">Halo, {this.props.username} <i className="fa fa-chevron-down"/></a>
                                    <ul>
                                        <li><a href="#flight">Ubah Profil</a></li>
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

const mapStateToProps = (state) => {
    console.log(state.auth.role)
    return { 
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin })(HeaderTID);