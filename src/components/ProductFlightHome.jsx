import React, { Component } from 'react';
import FormFlight from './FormFlight';
import CarouselFlight from './CarouselFlight';


class ProductFlightHome extends Component {
    render() {
        return(
            <div id="hero" className="wow fadeIn">
            <div className="container">
               <CarouselFlight />
               {/* <FormFlight /> */}
           </div>
           </div>
         
                
            
        )
    }
}

export default ProductFlightHome;