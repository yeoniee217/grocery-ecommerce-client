import React from 'react';

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

    fetch('http://localhost:3000/categories/all_categories').then(response => {
      return response.json();
    }).then(json => {
      this.setState({categories: json});
      return json;
    }).then(json => console.log(this.state.categories))
    .catch(error => console.log(error))

    fetch(`http://localhost:3000/products/by_category_id/${category_id}`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({products: json});
      return json;
    }).then(json => console.log(this.state.products))
    .catch(error => console.log(error))
  }

  renderProducts = () => {
    return (
      this.state.products.map(product =>
        <CollectionItem key={product.id} product={product} />
      ));
  }

  render() {
    return (
      <div class="container">
        <Header categories={ this.state.categories } />
        <SubNavBar categories={ this.state.categories } />
        <div class="row">
          {this.renderProducts()}
        </div>

      </div>
    );
  }

}

export default CollectionPage;
