import React from 'react';

const CollectionItem = ({product}) => {
  const { num, name, price, description, stock_quantity, discount } = product;

  return (
    <div class="col-md-4">
      <div class="card mt-5 ml-2">
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">Price: {price}</p>
          <p class="card-text">Description: {description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Stock Quantity: {stock_quantity}</li>
            <li class="list-group-item">Email:</li>
          </ul>
          <a href="#" class="btn btn-primary mt-3">View</a>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
