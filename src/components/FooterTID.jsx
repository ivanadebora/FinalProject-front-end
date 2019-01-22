import React, {Component} from 'react';

class FooterTID extends Component {
    render(){
        return(
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <div className="footer-logo">
                                <img src="img/travelID.png" alt="logoTID" width="200px"/>
                            <div>
                                <img src="img/24hours.png" alt="logoTID" width="50px"/>
                                <span className="call-us">
                                    <h4>Hubungi kami:</h4>
                                    <h2>0812-1200-703</h2>
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                            <div className="list-menu">
                                <h4>Tentang travelID</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#2aaa">Cara Pesan</a></li>
                                    <li><a href="#3aaa">Tentang Kami</a></li>
                                    <li><a href="#4aa">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                            <div className="list-menu">
                                <h4>Produk</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#1aa">Hotel</a></li>
                                    <li><a href="#2aa">Penerbangan</a></li>
                                    <li><a href="#3aaa">Kereta</a></li>
                                    <li><a href="#3aaa">Bus</a></li>
                                    <li><a href="#3aaa">Hiburan</a></li>
                                   
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                            <div className="list-menu">
                                <h4>Ketentuan Penggunaan</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#1aaa">Syarat dan Ketentuan</a></li>
                                    <li><a href="#2aaa">Kebijakan Privacy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyrights">
                    <div className="container">
                        <p>© Copyrights 2019 travelID. All rights reserved.</p>
                        <div className="credits">
                            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterTID;