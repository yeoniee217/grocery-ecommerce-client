import React from 'react';

import './Header.styles.scss';

const Header = ({ categories }) => (
  <div className="container mt-3">
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand logo" href="/">SuperiorStore</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
        <form className="form-inline ml-5 mr-5">
            <select className="form-control search-bar">
              <option value="0">All Categories</option>
              {categories.length ?
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
                :
                null
              }
            </select>
            <div className="input-group" style={{width:"70%"}}>
              <input className="form-control search-bar search-section" style={{borderRight:"0"}} type="search" aria-label="Search"/>
              <span className="input-group-append">
                <button className="btn btn-outline-primary search-bar" style={{borderLeft:"0"}}>
                    <i className="fa fa-search" style={{fontSize:"1.5em"}}></i>
                </button>
              </span>
            </div>
        </form>

        <ul className="navbar-nav mt-1 ml-4">
          <li className="nav-item active mr-3">
            <a className="nav-link" href="/"><i className="fas fa-user green"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/"><i className="fas fa-shopping-cart green"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
