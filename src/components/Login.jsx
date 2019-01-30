import React, {Component} from 'react';


class Login extends Component {
    render(){
        return(
            <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src="img/travel-bag.png" alt="sing up" width="350px"/></figure>
              <a href="/register" className="signup-image-link">Create an account</a>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Selamat datang kembali!</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name" /></label>
                  <input type="text" name="username" id="username" placeholder="Your Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                  <input type="password" name="your_pass" id="your_pass" placeholder="Your Password" />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className="form-submit" defaultValue="Log in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
        )
    }
}

export default Login