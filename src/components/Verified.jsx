import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {connect} from 'react-redux';
import {onUserVerified} from '../actions';

class Verified extends Component {
    state = {verified: false, loading: true}

    componentDidMount(){
        var params = queryString.parse(this.props.location.search);
        console.log(params);
        var username = params.username;
        var password = params.password;
        axios.post('http://localhost:1212/auth/verified', {
            username, password
        })
        .then((res) => {
            this.setState({loading:false, verified:true});
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    renderContent = () => {
        if(this.state.verified && !this.state.loading){
            return(
                <div>
                    <h3>Congrats you are verified!</h3>
                    <p>Now you can use all the app features!</p>
                </div>
            );
        }
        else if(!this.state.verified && !this.state.loading){
            return(
                <div>
                    <h3>Sorry error happened</h3>
                    <p>Please, try to reload this page!</p>
                </div>
            );
        }
        return (
            <h3>Please wait...</h3>
        )
    }
    render(){
        return(
            <div id="hero" className="wow fadeIn">
                <div className="hero-container">
                    <div>
                        {this.renderContent()}
                    </div>
                    <img src="img/travel2.png" alt="Hero Imgs" width="700px" />
                </div>
            </div>
        );
    }
}



export default connect(null, {onUserVerified})(Verified);