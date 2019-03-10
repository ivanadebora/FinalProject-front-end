import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserLogin} from '../actions/authAction';

const cookies = new Cookies();

class Login extends Component {

  componentWillReceiveProps(newProps) {
    if (newProps.username !== '') {
        cookies.set('dataUser', newProps.username, {path: '/'});
        cookies.set('dataRole', newProps.role, {path: '/'})
    }
  }

  onBtnLoginClick = () => {
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    this.props.onUserLogin({username,password})
  }

  renderError = () => {
    if (this.props.error.length > 0) {
        return <p className="alert alert-danger">{this.props.error}</p>
    }
  }

  renderButton = () => {
    if (this.props.loading === true) {
        return (<div><i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }} /></div>)
    }
    return (
      <div className="form-group">
          <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Masuk" onClick ={this.onBtnLoginClick}/>
      </div>
    );
  } 
  
  render(){
    if(this.props.username === "") {
      return(
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure><img src="img/travel-bag.png" alt="sing up" width="350px"/></figure>
                <p className="signup-image-link">Don't have any account ?
                <div/>
                <a href="/register" className="signup-image-link">Create an account</a></p>
                
              </div>
              <div className="signin-form">
                <h2 className="form-title">Selamat datang kembali!</h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name" /></label>
                    <input type="text" name="username" id="username" ref="username" placeholder="Your Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                    <input type="password" name="password" id="password" ref="password" placeholder="Your Password" />
                  </div>
                  {this.renderError()}
                  {this.renderButton()}
                </form>
              </div>
            </div>
          </div>
        </section>
      )
    }
    else if (this.props.username !== '' && this.props.status === 'Unverified') {
      return <Redirect to={`/waitingverification?username=${this.props.username}&password=${this.props.password}`} />
    }
    else if (this.props.username !== '' && this.props.status === 'Verified' && this.props.role === 'User') {
      return <Redirect to="/"/>
    }
    else if (this.props.username !== '' && this.props.status === 'Verified' && this.props.role === 'AdminProduct') {
      return <Redirect to="/adminproducthome"/>
    }
    else if (this.props.username !== '' && this.props.status === 'Verified' && this.props.role === 'AdminPembayaran') {
      return <Redirect to="/adminpaymenthome"/>
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth.password)
  return {
      username: state.auth.username,
      password: state.auth.password,
      status: state.auth.status,
      role: state.auth.role, 
      error: state.auth.error,
      loading: state.auth.loading
  };
}


export default connect(mapStateToProps,{onUserLogin})(Login);