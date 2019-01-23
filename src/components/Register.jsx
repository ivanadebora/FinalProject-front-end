import React, {Component} from 'react';




class Register extends Component {
    render(){
        return (
            <section className="signup">
            <div className="container">
              <div className="signup-content">
                <div className="signup-form">
                  <h3 className="form-title">Bergabunglah Menjadi Member travelID</h3>
                  <form method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                      <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="name" id="name" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                      <input type="email" name="email" id="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                      <input type="password" name="pass" id="pass" placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline" /></label>
                      <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                    </div>
                    <div className="form-group form-button">
                      <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                    </div>
                  </form>
                </div>
                <div className="signup-image">
                  <figure><img src="img/palm-beach.png" alt="register" width="300px"/></figure>
                  <a href="#aaa" className="signup-image-link">I am already member</a>
                </div>
              </div>
            </div>
          </section>
        )
    }
}

export default Register;