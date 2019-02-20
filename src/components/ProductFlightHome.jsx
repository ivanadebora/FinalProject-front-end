import React, { Component } from 'react';
import FormFlight from './FormFlight';
import CarouselFlight from './CarouselFlight';


class ProductFlightHome extends Component {
    render() {
        return(
            <div>
            <div id="hero" className="wow fadeIn" style={{marginTop:"-80px"}}>
                <div className="hero-container">
                    <CarouselFlight />
                </div>
           </div>
           <div id="get-started" className="padd-section wow fadeInUp" style={{marginTop:"-180px"}}>
                <div className="container">
                <FormFlight />
                </div>
            </div>
           </div>
        )
    }
}

export default ProductFlightHome;