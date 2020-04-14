import React from 'react';

import './header.styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // category: '',
      // keyword: ''
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

  render() {
    return (
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light">
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
              <li className="nav-item active mr-3">
                <a className="nav-link" href="/signup"><i className="fas fa-user green"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/checkout">
                  <i className="fas fa-shopping-cart green"></i>
                  <span class="badge badge-green ml-1">4</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

}

export default Header;
