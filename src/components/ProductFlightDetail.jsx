import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
import { select_product } from '../actions'



class ProductFlightDetail extends Component {

    componentDidMount() {
        // var productId = this.props.match.params.id;
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var product_id = params.productId
        console.log(product_id)
        axios.post( `http://localhost:1212/flight/getdetail`,{
            product_id
        })
        .then((res) => {
            this.props.select_product(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        var { 
            image, nama, code, seat_class, tanggal,
            departure_city, departure_terminal, departure_time,
            arrival_city, arrival_time, arrival_terminal,
            description
        } = this.props.product
        return(
            <div id="hero" className="wow fadeIn">
            <div className="hero-container">
                <div className="row">
                    <div className="col-3 span" >
                        <div className="row">
                            <img src={image} alt={image} className="img-responsive"  />
                        </div>
                        <div className="row">
                            <h3>{nama}</h3>
                        </div>
                        <div className="row">
                            <h3>{code}</h3>
                        </div>
                        <div className="row">
                            <h3>{seat_class}</h3>
                        </div>
                    </div>
                    <div className="col-3 span">
                        <div className="row">
                            <h3>{moment(tanggal).format('Do MM YYYY')}</h3>
                        </div>
                        <div className="row">
                            <h3>{departure_time}</h3>
                        </div>
                        <div className="row">
                            <h3>{arrival_time}</h3>
                        </div>
                        <div className="row">
                        </div>
                    </div>
                    <div className="col-3 span">
                        <div className="row">
                            <h3>{departure_city}</h3>
                        </div>
                        <div className="row">
                            <h3>{departure_terminal}</h3>
                        </div>
                        <div className="row">
                            <h3>{arrival_city}</h3>
                        </div>
                        <div className="row">
                            <h3>{arrival_terminal}</h3>
                        </div>
                    </div>
                    <div className="col-3 span">
                        <div className="row">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.selectedFlight)
    return { 
        username: state.auth.username,
        product: state.selectedFlight
    }
}

export default connect(mapStateToProps, { select_product })(ProductFlightDetail);