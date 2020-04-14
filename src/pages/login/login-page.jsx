import React from 'react';
import { Link } from "react-router-dom";

import './login-page.styles.scss'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // categories: [],
      // product_id: null,
      // product: null
      name: "",
      email: "",
      password: ""
    }
  }

  componentDidMount() {

  }

  // onChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  // }

  onSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div class="container">
        <div className="login-wrapper">
          <h2 className="form-group col-md-7 font-weight-bold loginHeader">Sign in</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group col-md-11 font-weight-bold">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control"
                      id="email" placeholder="Email" name="email"
                      // value={this.state.email}
                      // onChange={this.handleChange('email')}
              />
            </div>

            <div className="form-group col-md-11 font-weight-bold">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"
                      id="password" placeholder="Password" name="password"
                      // value={this.state.password}
                      // onChange={this.handleChange('password')}
              />
            </div>

            <div className="form-group col-md-11">
              <button type="submit" className="btn btn-primary btn-block loginMargin">Sign in</button>
              <Link to="/forgot-password" className="btn btn-outline-dark btn-block" id='forgotPassword'>Forgot Password?</Link>
              <Link to="/request-account" className="btn btn-outline-dark btn-block" id='requestAccount'>Request Account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
