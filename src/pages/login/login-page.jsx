import React from 'react';
import { Link } from "react-router-dom";

import {loginUser} from '../../api/users';

import './login-page.styles.scss'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }

  componentDidMount() {

  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = this.state;

    let user = {
      email: email,
      password: password
    }

    await loginUser(user).then(data => {
      if(data.logged_in) {
        this.props.handleLogin(data);
        this.redirect();
      }

    }).catch(error => {
      console.log("LoginPage Compo - onSubmit - *login", error);
    });
  }

  redirect = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div class="container" style={{width:"25%"}}>
          <h2 className="form-group col-md-7 font-weight-bold loginHeader">Log in</h2>

          <form onSubmit={this.onSubmit}>
            <div className="form-group col-md-11 font-weight-bold">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control"
                      id="email" placeholder="Email" name="email"
                      value={this.state.email}
                      onChange={this.onChange} />
            </div>
            <div className="form-group col-md-11 font-weight-bold">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"
                      id="password" placeholder="Password" name="password"
                      value={this.state.password}
                      onChange={this.onChange} />
            </div>

            <div className="form-group col-md-11">
              <button type="submit" className="btn btn-primary btn-block loginMargin">Log in</button>
              <Link to="/signup" className="btn btn-outline-dark btn-block">Sign up</Link>
            </div>
          </form>
      </div>
    );
  }
}

export default LoginPage;
