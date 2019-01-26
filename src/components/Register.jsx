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
                      <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="username" id="username" placeholder="Your Username" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                      <input type="email" name="email" id="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone"><i className="zmdi zmdi-phone" /></label>
                      <input type="text" name="phone" id="phone" placeholder="Your Phone Number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                      <input type="password" name="pass" id="pass" placeholder="Password" />
                    </div>
                    <div className="form-group form-button">
                      <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                    </div>
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
}

export default Register;