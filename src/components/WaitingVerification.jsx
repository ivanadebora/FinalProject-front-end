import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import FooterTID from './FooterTID';


class WaitingVerification extends Component {

    onBtnResend = () => {
        var params = queryString.parse(this.props.location.search)
        var username = params.username
        var password = params.password

        axios.post('http://localhost:1212/auth/resendmail', {
            username, password
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.props.username !== '') {
            return(
                <div>
                <div id="hero" className="wow fadeIn">
                    <div className="hero-container">
                        <div>
                            <h3>Please check your email to verify your account!</h3>
                            <h3>If you do not receive any verification email, please click button below!</h3>
                            <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Resend Email"  onClick ={this.onBtnResend} />
                        </div>
                        <img src="img/travel2.png" alt="Hero Imgs" width="700px" />
                    </div>
                </div>
                <FooterTID />
                </div>
            )
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(WaitingVerification);