import React, {Component} from 'react';


class HeaderTID extends Component {
    render(){
        return(
            <header id="header" className="header header-hide">
                <div className="container">
                    <div id="logo" className="pull-left">
                        <a href="/"><img src="img/travelID.png" alt="logoTID" width="150px"/></a>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li><a href="#hero">Pesanan Saya</a></li>
                            <li className="menu-has-children"><a href="#product">Produk kami <i className="fa fa-chevron-down"/></a>
                                <ul>
                                    <li><a href="#flight">Hotel</a></li>
                                    <li><a href="#hotel">Penerbangan</a></li>
                                    <li><a href="#car">Kereta Api</a></li>
                                    <li><a href="#car">Bus</a></li>
                                    <li><a href="#entertainment">Hiburan</a></li>
                                </ul>
                            </li>
                            <li className="menu-active"><a href="/login">Masuk <i className="fa fa-user"/></a></li>
                            <li className="register"><a href="/register">Daftar</a></li>
                            {/* <li><a href="#screenshots">Screenshots</a></li>
                            <li><a href="#team">Team</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#contact">Contact</a></li> */}
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}


export default HeaderTID;