import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import {logoutUser} from '../../api/users';

import './header.styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '0',
      keyword: '',
      searchFormSubmitted: false,
    }
  }

  // fetchSearchResults = (e) => {
  //   e.preventDefault();
  //   // let keyword = e.target.value;

  //   fetch(`http://localhost:3000/products/search?category=${this.state.category}&keyword=${this.state.keyword}.json`).then(response => {
  //     return response.json();
  //   }).then(json => {
  //     this.setState({products: json});
  //     return json;
  //   }).then(json => console.log(this.state.products))
  //   .catch(error => console.log(error));
  // }

  // onChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  // }

  // onSubmitSearch = e => {
  //  this.setState({searchFormSubmitted: true});
  // }

  onLogoutBtnClick = () => {
    logoutUser().then(data => {
      this.props.handleLogout();
      this.props.history.push('/');
    }).catch(error => {
      console.log("App Compo - handleLogout - *logoutUser", error);
    })
  }

  render() {
    // if(this.state.searchFormSubmitted) {
    //       return <Redirect to={{pathname: '/search',
    //               search: `?categoryID=${this.state.category}&keyword=${this.state.keyword}`}} />
    // }

    return (
      <div className="container" style={{marginBottom: "60px"}}>
        <nav className="navbar navbar-expand-lg" style={{padding:"0"}}>
          <a className="navbar-brand logo" href="/">SuperiorStore</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <form onSubmit={this.props.onSubmitSearch} className="form-inline ml-5 mr-5">
                <select name="categoryID" onChange={this.props.onChange} className="form-control search-bar">
                  <option value="0">All</option>
                  {this.props.categories && this.props.categories.length ?
                    this.props.categories.map(category => (
                      <option key={category.id} value={category.id} >{category.name}</option>
                    ))
                    :
                    null
                  }
                </select>
                <div className="input-group" style={{width:"70%"}}>
                  <input type="text" name="keyword" onChange={this.props.onChange}
                    className="form-control search-bar search-section" style={{borderRight:"0"}} aria-label="Search"/>
                  <span className="input-group-append">
                    <button type="submit" className="btn btn-outline-primary search-bar" style={{borderLeft:"0"}}>
                        <i className="fa fa-search" style={{fontSize:"1.5em"}}></i>
                    </button>
                  </span>
                </div>
            </form>

            <ul className="navbar-nav mt-1 ml-4">
              {/* <li className="nav-item active mr-3">
                <a className="nav-link" href="/signup"><i className="fas fa-user green"></i></a>
              </li> */}
              {/* {
                this.props.loggedInStatus ?
                  <li className="nav-item active mr-3">
                    <a onClick={this.onLogoutBtnClick} href="/" className="nav-link" ><i className="fas fa-user"></i></a>
                  </li>
                :
                  null
              } */}

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-user green fa-2x"></i>
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{width:"200px"}}>
                      {this.props.loggedInStatus ?
                        [<div style={{fontSize:"14px"}} className="font-weight-bold text-center mt-0">
                            <span class="mr-2">Welcome,</span> {this.props.user.first_name} {this.props.user.last_name}
                          </div>,
                          <div className="dropdown-divider"/>,
                          <Link className="dropdown-item" to="/user-profile"><i class="fas fa-user-circle mr-2"></i> Profile</Link>,
                          <div className="dropdown-divider"/>,
                          <Link className="dropdown-item" to="#" onClick={this.onLogoutBtnClick}>
                            <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                          </Link>
                        ]
                      :
                        [<div style={{fontSize:"14px"}} className="font-weight-bold text-center mt-0">
                            Hello, join us!
                          </div>,
                          <div className="dropdown-divider"/>,
                          <Link className="dropdown-item" to="/login"><i class="fas fa-user-circle mr-2"></i> Log in</Link>,
                          <div className="dropdown-divider"/>,
                          <Link className="dropdown-item" to="/signup" onClick={this.onLogoutBtnClick}><i className="fas fa-sign-out-alt mr-2"></i> Sign up</Link>
                        ]
                      }
                  </div>
                </li>
                {
                  this.props.loggedInStatus ?
                    <li className="nav-item ml-4">
                      <a className="nav-link" href="/cart">
                        <i className="fas fa-shopping-cart green"></i>
                        {/* <span class="badge badge-green ml-1">4</span> */}
                      </a>
                    </li>
                  :
                    null
                }
            </ul>
          </div>
        </nav>
      </div>
    );
  }

}

export default Header;
