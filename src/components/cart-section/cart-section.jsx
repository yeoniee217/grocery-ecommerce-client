import React from 'react';
import { Link } from "react-router-dom";

import {formatCurrency} from '../../util/util'

const CartSection = ({cartItems, handleRemoveFromCart, onQuantityChange}) => {
  console.log(cartItems);
  return (
    <div class="col-md-9">
      <table class="table table-hover">
        <thead>
            <tr>
              <th>Item</th>
              <th class="text-center">Price</th>
              <th class="text-center">Quantity</th>
              {/* <th class="text-center">Subtotal</th> */}
              <th></th>
            </tr>
        </thead>
        <tbody>
          {
            cartItems ?
            cartItems.map(item =>
              <tr class="mt-5" key={item.id}>
                <td class="col-md-4">
                  <div class="media">
                    <a class="mr-3" href={`products/${item.id}`}>
                      <img src={item.imageUrl}
                        style={{width:"108px", height:"108px"}}/>
                    </a>
                    <div class="media-body" style={{marginTop:"4%"}}>
                      <h4 class="font-weight-bold">
                        <Link to={{pathname: `products/${item.id}`}}
                          style={{color:"#0066c0",textDecoration: "none"}}>
                          {item.name}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td class="col-md-2 text-center">
                  <p class="font-weight-bold" style={{marginTop:"60%"}}>{formatCurrency(item.price/100)}</p>
                </td>
                <td class="col-md-2" style={{textAlign:"center"}}>
                  <select name="quantity" value={item.quantity} onChange={e => onQuantityChange(e,item)} class="form-control" style={{marginTop:"30%"}}>
                    {/* {
                      [for (i of Array(10).keys()) i+1].map(i => {
                        <option value={i}>i</option>
                      })
                    } */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </td>
                {/* <td class="col-md-1 text-center">
                  <p class="font-weight-bold" style={{marginTop:"40%"}}>{formatCurrency((item.price * item.quantity)/100)}</p>
                </td> */}
                <td class="col-md-2">
                  <button type="button" class="btn btn-danger" style={{marginTop:"30%"}}
                    onClick={e => handleRemoveFromCart(e, item)}>
                    Remove
                  </button>
                </td>
              </tr>
            )
          :
            null
          }
        </tbody>
      </table>
    </div>
  );

};

export default CartSection;
