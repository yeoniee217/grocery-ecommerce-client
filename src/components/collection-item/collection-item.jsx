import React from 'react';
import { Link } from "react-router-dom";

import {formatCurrency} from '../../util/util'
import './collection-item.styles.scss'

const CollectionItem = ({product, handleAddToCart}) => {
  const { id, num, name, description, price, stock_quantity, discount, imageUrl } = product;

  return (
    <div class="col-md-3">
        <div class="card mt-5 ml-5" style={{width:"100%"}}>
          <img className="card-img-top mt-3" src={imageUrl} alt="Product Image" style={{width:"150px", height:"150px", alignSelf:"center"}}/>
          <div class="card-body">
            <Link to={{ pathname:`/products/${id}` }} style={{textDecoration: "none", color:"inherit"}}>
              <h5 class="card-title" style={{height:"100px"}}>{name}</h5>
            </Link>
            <p class="card-text font-weight-bold">{formatCurrency(price/100)}</p>
            {
              !product.alreadyInCart ?
                <button type="button" class="btn btn-primary font-weight-bold add-cart-btn"
                  onClick={e => handleAddToCart(e, product)}>
                  <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> Add to Cart
                </button>
              :
                <button type="button" disabled class="btn btn-success font-weight-bold add-cart-btn"
                  onClick={e => handleAddToCart(e, product)}>
                  <i class="fas fa-check mr-2" aria-hidden="true"></i> In Cart
                </button>
            }
          </div>
        </div>
    </div>
  );
};

export default CollectionItem;
