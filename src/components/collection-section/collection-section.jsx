import React, { Component } from 'react'

import './collection-section.styles.scss';
import CollectionItem from '../collection-item/collection-item';


class CollectionSection extends Component {
  constructor(props) {
    super(props);
  }

  renderProducts = () => {
    return (
      this.props.products.map(product =>
        <CollectionItem key={product.id} product={product} handleAddToCart={this.props.handleAddToCart}/>
      ));
  }

  render() {
    return (
      <div class="row" style={{width:"70%"}}>
        {this.renderProducts()}
      </div>
    )
  }
}

export default CollectionSection;
