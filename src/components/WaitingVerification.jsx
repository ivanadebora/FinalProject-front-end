import React, {Component} from 'react';


class WaitingVerification extends Component {

    render(){
        return(
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
        )
    }
}

export default WaitingVerification;