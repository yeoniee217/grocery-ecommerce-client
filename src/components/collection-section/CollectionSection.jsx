import React, { Component } from 'react'

import './CollectionSection.styles.scss';
import CollectionItem from '../../components/collection-item/CollectionItem';


class CollectionSection extends Component {
  constructor(props) {
    super(props);
  }

  renderProducts = () => {
    return (
      this.props.products.map(product =>
        <CollectionItem key={product.id} product={product} />
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
