import React, {Component} from 'react';
import FooterTID from './FooterTID';


class Homepage extends Component {
    render(){
        return(
            <div>
            {/* //---------------------------- Welcome ----------------------------------// */}
            <div id="hero" className="wow fadeIn">
                <div className="hero-container">
                    <h1>Selamat datang di travelID</h1>
                    <h3>Rencanakan liburan Anda dengan mudah dan hemat bersama kami!</h3>
                    <img src="img/travel.png" alt="Hero Imgs"/>
                    {/* <div className="btns">
                        <a href="#hotel"><i className="fa fa-building fa-2x" /> Hotel</a>
                        <a href="/flighthome"><i className="fa fa-plane fa-2x" /> Penerbangan</a>
                        <a href="#ticket"><i className="fa fa-ticket fa-2x" /> Aktivitas</a>
                    </div> */}
                </div>  
            </div>
            {/* //---------------------------- TravelID ----------------------------------// */}
            <div id="get-started" className="padd-section text-center wow fadeInUp">
                <div className="container">
                    <div className="section-title text-center">
                        <h2>Mengapa harus travelID?</h2>
                        <p className="separator">Bergabunglah menjadi member travelID untuk menikmati berbagai keuntungan!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="feature-block">
                                <img src="img/svg/tag.svg" alt="img" className="img-fluid" />
                                <h4>Garansi Harga Terbaik</h4>
                                <p>Dapatkan jaminan harga terbaik sepanjang tahun dengan jaringan yang luas sehingga harga kompetitif.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="feature-block">
                                <img src="img/svg/secure.svg" alt="img" className="img-fluid" />
                                <h4>Pembayaran Aman dan Mudah</h4>
                                <p>Pembelian voucher menjadi semakin fleksibel dengan berbagai metode pembayaran yang terjamin keamanannya.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="feature-block">
                                <img src="img/svg/24hservice.svg" alt="img" className="img-fluid" />
                                <h4>24 Hours Customer Service</h4>
                                <p>Kami selalu siap 24 jam untuk membantu melancarkan perjalanan Anda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* //---------------------------- Video ----------------------------------// */}
            <div id="video" className="text-center wow fadeInUp">
                <div className="container">
                    <div className="section-title text-center">
                        <h3><img src="img/wonderful-indonesia.png" alt="wonderful-indonesia" width="180px"/>
                            Jelajahi Pesona Indonesia<img src="img/wonderful-indonesia.png" alt="wonderful-indonesia" width="180px"/></h3>
                    </div>
                </div>
                <div className="overlay">
                    <div className="container">
                        <div className="row" style={{marginLeft:"50px"}}>
                            <video width={1024} height={576} controls>
                                <source src="video/videoplayback.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            {/* //---------------------------- Subscribe ----------------------------------// */}
            <div id="newsletter" className="newsletter text-center wow fadeInUp">
                <div className="overlay padd-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-9 col-lg-6">
                                <h4>Daftarkan alamat email Anda sekarang dan jadi yang pertama tahu tentang promo terbaru kami!</h4>
                            </div>
                            <div className="col-md-9 col-lg-6">
                                <form className="form-inline">
                                    <input type="email" className="form-control " placeholder="Email Adress" name="email" />
                                    <button type="submit" className="btn btn-default"><i className="fa fa-location-arrow" />Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <ul className="list-unstyled">
                                <li><a href="#facebook"><i className="fa fa-facebook" /></a></li>
                                <li><a href="#twitter"><i className="fa fa-twitter" /></a></li>
                                <li><a href="#google"><i className="fa fa-google-plus" /></a></li>
                                <li><a href="#instagram"><i className="fa fa-instagram" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* //----------------------------------------------------------------------// */}
            <FooterTID/>
            </div>
        )
    }
}

export default Homepage;