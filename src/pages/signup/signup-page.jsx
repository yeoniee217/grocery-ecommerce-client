import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './signup-page.styles.scss'

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  onSubmit = e => {
    console.log(e.target);
    // const user = {
    //   name: e.target.value
    // };
  }

  render() {
    return (
      <div>
        <div className="card">
          <article className="card-body mx-auto" style={{width: '450px'}}>
              <h4 className="card-title mt-3 text-center font-weight-bold">Request Account</h4>
              <form onSubmit={this.onSubmit()} noValidate>
                  <div className="form-group mb-4">
                      <label className="control-label font-weight-bold">Email</label>
                      <input type="email" ref="email" name="email" id='email'
                              value={this.state.email}
                              onChange={this.handleChange('email')}
                              className="form-control" placeholder="Email"
                      />
                      {this.validator.message('email', this.state.email.trim(), 'required|email')}
                  </div>
                  <div className="form-group mb-4">
                      <label className="control-label font-weight-bold">First name</label>
                      <input type="text" ref="firstName" name="firstName"
                              className="form-control" placeholder="First name" id='firstName'
                              value={this.state.firstName}
                              onChange={this.handleChange('firstName')}
                      />
                      {this.validator.message('firstName', this.state.firstName.trim(), 'required|string')}
                  </div>
                  <div className="form-group mb-4">
                      <label className="control-label font-weight-bold">Last name</label>
                      <input type="text" ref="lastName" name="lastName" id='lastName'
                              className="form-control" placeholder="Last name"
                              value={this.state.lastName}
                              onChange={this.handleChange('lastName')}
                      />
                      {this.validator.message('lastName', this.state.lastName.trim(), 'required|string')}
                  </div>
                  <div className="form-group mb-4">
                      <label className="control-label font-weight-bold">Phone Number</label>
                      <input type="tel" ref="phone" name="phone" id='phoneNumber'
                              className="form-control" placeholder="Phone Number"
                              value={this.state.phone}
                              onChange={this.handleChange('phone')}
                      />
                      {this.validator.message('Phone Number', this.state.phone.trim(), 'required|phone')}
                  </div>
                  <div className="form-group mb-4">
                      <label className="control-label font-weight-bold">Job Title</label>
                      <select name="jobTitle" value={this.state.value} onChange={this.handleChange('jobTitle')}
                              className="form-control" id="exampleFormControlSelect1">
                          <option value=''></option>
                          <option value='Instructor'>Instructor</option>
                          <option value='Student'>Student</option>
                          <option value='Department Head'>Department Head</option>
                      </select>
                      {this.validator.message('Job Title', this.state.jobTitle, 'required|string')}
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" id='requestButton'>Request Account</button>
                      <Link to="/" className="btn btn-outline-dark btn-block" id='haveAccount'>Have an Account? Sign in!</Link>
                  </div>
              </form>
          </article>
      </div>
      </div>
    );
  }
}

export default SignUpPage;
