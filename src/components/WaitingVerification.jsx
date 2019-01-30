import React, {Component} from 'react';

class WaitingVerification extends Component {
    render(){
        return(
            <div>
                <p>Please check your email to verify your account!</p>
                <p>If you do not receive any verify email, please click button below!</p>
                <input type="button" value="Resend email" />
            </div>
        )
    }
}

export default WaitingVerification