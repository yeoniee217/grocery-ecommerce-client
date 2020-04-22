import React, { Component } from 'react'
import { Link } from "react-router-dom";

import {createUser} from '../../api/users';
import {getProvinces} from '../../api/provinces';

import './signup-page.styles.scss'

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      email: "",
      password: "",
      password_confirmation: "",
      firstName: "",
      lastName: "",
      address: "",
      provinceID: ""
    };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }

  async componentDidMount() {
    await getProvinces().then(provinces => {
      this.setState({ provinces: provinces });
    }).catch(error => {
      console.log("SignUpPage Compo - componentDidMount - *getProvinces", error);
    });
  }

  onChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  onSignUpSubmit = async (e) => {
    e.preventDefault();
    const {email, password, password_confirmation, firstName, lastName, address, provinceID} = this.state;
    console.log(this.state);
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      firstName: firstName,
      lastName: lastName,
      address: address,
      provinceID: parseInt(provinceID)
    }

    await createUser(user).then(data => {
      if(data.status === "created") {
        console.log(data);
        this.props.handleLogin(data);
        this.redirect();
      }
      console.log(data);
    }).catch(error => {
      console.log("SignUpPage Compo - onSignUpSubmit - *createUser", error);
    });

  }

  redirect = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div class="container">
        <article className="card-body mx-auto" style={{width: '450px'}}>
            <h4 className="card-title text-center font-weight-bold">Create your account</h4>
            <form onSubmit={this.onSignUpSubmit} noValidate>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="control-label font-weight-bold">Email</label>
                    <input type="email" ref="email" name="email"
                            className="form-control" placeholder=""
                            value={this.state.email} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="control-label font-weight-bold">Password</label>
                    <input type="password" ref="password" name="password"
                            className="form-control" placeholder=""
                            value={this.state.password} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="control-label font-weight-bold">Confirm Password</label>
                    <input type="password" ref="password_confirmation" name="password_confirmation"
                            className="form-control" placeholder=""
                            value={this.state.password_confirmation} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="text" className="control-label font-weight-bold">First name</label>
                    <input type="text" ref="firstName" name="firstName"
                            className="form-control" placeholder=""
                            value={this.state.firstName} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label className="control-label font-weight-bold">Last name</label>
                    <input type="text" ref="lastName" name="lastName"
                            className="form-control" placeholder=""
                            value={this.state.lastName} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label className="control-label font-weight-bold">Address</label>
                    <input type="text" ref="address" name="address"
                            className="form-control" placeholder=""
                            value={this.state.address} onChange={this.onChange} />
                </div>
                <div className="form-group mb-4">
                    <label className="control-label font-weight-bold">Province</label>
                    <select value={this.state.provinceID} onChange={this.onChange} class="form-control" name="provinceID">
                      <option value="0"></option>
                      {
                        this.state.provinces.length ?
                          this.state.provinces.map(province => {
                            return <option value={province.id}>{province.name}</option>
                          })
                        :
                          null
                      }
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" id='requestButton'>Sign up</button>
                    <Link to="/login" className="btn btn-outline-dark btn-block" id='haveAccount'>Have an Account? Log in!</Link>
                </div>
            </form>
        </article>
      </div>
    );
  }
}

export default SignUpPage;
