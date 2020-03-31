import React from 'react';
import { Link } from "react-router-dom";

import './HomePage.styles.scss';
import Header from '../../components/header/Header';

import grocery from "../../assets/grocery.jfif";
import grocery2 from "../../assets/grocery2.jfif";
import grocery3 from "../../assets/grocery3.jfif";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/categories/all_categories.json').then(response => {
      return response.json();
    }).then(json => {
      this.setState({categories: json});
      return json;
    }).then(json => console.log(this.state.categories))
    .catch(error => console.log(error))
  }

  renderCategories = () => {
    return (
      this.state.categories.map(category =>
        <li key={category.id} class="nav-item">
          <Link className="nav-link ml-3" to={{ pathname:`/categories/${category.id}` }}>{category.name}</Link>
        </li>
      )
    );
  }

  render() {
    return (
      <div>
        <Header categories={this.state.categories}/>
        <div class="mt-3" style={{position: 'absolute', width: '100%', display: 'flex', marginLeft: '20%'}}>
          <nav class="navbar-expand-lg category-nav">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <a class="navbar-brand ml-4" href="#"><i class="fas fa-chevron-down mr-2"></i> All Categories</a>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav flex-dir-col">
                {this.state.categories.length ?
                  this.renderCategories()
                :
                  null
                }
              </ul>
            </div>
          </nav>
        </div>

        <div id="carouselExampleIndicators" className="carousel slide" style={{marginTop:'3.5rem'}} data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={grocery} alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={grocery3} alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={grocery2} alt="Third slide"/>
            </div>
          </div>

          <a className="carousel-control-prev text-white ml-4" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <i className="fas fa-chevron-left fa-3x text-white"></i>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next text-white mr-4" href="#carouselExampleIndicators" role="button" data-slide="next">
            <i className="fas fa-chevron-right fa-3x text-white" ></i>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </div>
    );
  }

}

export default HomePage;
