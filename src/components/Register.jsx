import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserRegister } from '../actions/authAction'

class Register extends Component {

  onBtnRegisterClick = () => {
    var username = this.refs.username.value;
    var email = this.refs.email.value;
    var phone = this.refs.phone.value;
    var password = this.refs.password.value;

    this.props.onUserRegister({username,email,phone,password});
}

  renderError = () => {
    if (this.props.error.length > 0) {
        return <p className="alert alert-danger">{this.props.error}</p>
    }
  }

  renderLoading = () => {
    if (this.props.loading) {
        return <div><i className="fa fa-spinner"/></div>
    }
    return (
      <div className="form-group">
          <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Daftar" onClick ={this.onBtnRegisterClick}/>
      </div>
    )
  } 
  render(){
      if(this.props.username === ''){ 
        return (
          <section className="signup">
            <div className="container">
              <div className="signup-content">
                <div className="signup-form">
                  <h3 className="form-title">Bergabunglah Menjadi Member travelID!</h3>
                  <form method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                      <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="username" id="username" ref="username" placeholder="Your Username" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                      <input type="email" name="email" id="email" ref="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone"><i className="zmdi zmdi-phone" /></label>
                      <input type="text" name="phone" id="phone" ref="phone" placeholder="Your Phone Number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                      <input type="password" name="pass" id="pass" ref="password" placeholder="Your Password" />
                    </div>
                    {this.renderError()}
                    {this.renderLoading()}
                    </form>
                  </div>
                  <div className="signup-image">
                    <figure><img src="img/world.png" alt="register" width="300px"/></figure>
                    <a href="/login" className="signup-image-link">I am already member</a>
                  </div>
                </div>
              </div>
            </section>
          )
      }
      return <Redirect to="/waitingverification" />
  }
}

const mapStateToProps = (state) => {
  return {
      username: state.auth.username, 
      error: state.auth.error,
      loading: state.auth.loading
  };
}

export default connect(mapStateToProps, { onUserRegister }) (Register);