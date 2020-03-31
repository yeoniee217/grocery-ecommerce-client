import React from 'react';
import Pagination from 'react-paginating';

import './CollectionPage.styles.scss';
import Header from '../../components/header/Header';
import CollectionItem from '../../components/collection-item/CollectionItem';
import SubNavBar from '../../components/sub-navbar/SubNavBar';

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: []
    }
  }

  componentDidMount() {
    const category_id = this.props.match.params.id

    fetch('http://localhost:3000/categories/all_categories.json').then(response => {
      return response.json();
    }).then(json => {
      this.setState({categories: json});
      return json;
    }).then(json => console.log(this.state.categories))
    .catch(error => console.log(error));

    this.fetchProducts(category_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProducts(this.props.match.params.id);
    }
  }

  fetchProducts = (category_id) => {
    fetch(`http://localhost:3000/products/by_category_id/${category_id}.json`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({products: json});
      return json;
    }).then(json => console.log(this.state.products))
    .catch(error => console.log(error));
  }

  renderProducts = () => {
    return (
      this.state.products.map(product =>
        <CollectionItem key={product.id} product={product} />
      ));
  }

  render() {
    return (
      <div class="">
        <Header categories={ this.state.categories } />
        <SubNavBar categories={ this.state.categories } />
        <div style={{marginLeft:"10%", display:"flex"}}>
            <div class="card mt-5" style={{height:"fit-content"}}>
              <article class="card-group-item">
                <header class="card-header"><h6 class="title">Sub Categories</h6></header>
                <div class="filter-content">
                  <div class="list-group list-group-flush">
                    <a href="#" class="list-group-item">Cras justo odio <span class="float-right badge badge-light round">142</span> </a>
                    <a href="#" class="list-group-item">Dapibus ac facilisis  <span class="float-right badge badge-light round">3</span>  </a>
                    <a href="#" class="list-group-item">Morbi leo risus <span class="float-right badge badge-light round">32</span>  </a>
                    <a href="#" class="list-group-item">Another item <span class="float-right badge badge-light round">12</span>  </a>
                  </div>
                </div>
              </article>
              <article class="card-group-item">
                <header class="card-header card-border-top"><h6 class="title">Color check</h6></header>
                <div class="filter-content">
                  <div class="card-body">
                    <label class="btn btn-danger">
                      <input class="" type="checkbox" name="myradio" value=""/>
                      <span class="form-check-label">Red</span>
                    </label>
                    <label class="btn btn-success">
                      <input class="" type="checkbox" name="myradio" value=""/>
                      <span class="form-check-label">Green</span>
                    </label>
                    <label class="btn btn-primary">
                      <input class="" type="checkbox" name="myradio" value=""/>
                      <span class="form-check-label">Blue</span>
                    </label>
                  </div>
                </div>
              </article>
            </div>

            <div class="row" style={{width:"70%"}}>
              {this.renderProducts()}
            </div>

        </div>


      </div>
    );
  }

}

export default CollectionPage;
