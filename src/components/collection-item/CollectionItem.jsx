import React from 'react';
import './CollectionItem.styles.scss'

const CollectionItem = ({product}) => {
  const { num, name, description, price, stock_quantity, discount, imageUrl } = product;
  let currencyFormat = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
  return (
    <div class="col-md-3">
      <div class="card mt-5 ml-5" style={{width:"100%"}}>
        <img className="card-img-top mt-3" src={imageUrl} alt="Product Image" style={{width:"150px", height:"150px", alignSelf:"center"}}/>
        <div class="card-body">
          <h5 class="card-title" style={{height:"100px"}}>{name}</h5>
          <p class="card-text font-weight-bold">{currencyFormat.format(price/100)}</p>
          <a href="#" class="btn btn-primary font-weight-bold add-cart-btn"><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> Add to Cart</a>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
