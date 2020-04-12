import React from 'react';

import './CheckoutPage.styles.scss'

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  render() {
    return (
      <div class="row">
        <aside class="col-lg-9">
          <div class="card">
            <div class="table-responsive">
              <table class="table table-borderless table-shopping-cart">
                <thead class="text-muted">
                  <tr class="small text-uppercase">
                    <th scope="col">Product</th>
                    <th scope="col" width="120">Quantity</th>
                    <th scope="col" width="120">Price</th>
                    <th scope="col" class="text-right d-none d-md-block" width="200"> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <figure class="itemside align-items-center">
                        <div class="aside"><img src="bootstrap-ecommerce-html/images/items/1.jpg" class="img-sm"/></div>
                        <figcaption class="info">
                          <a href="#" class="title text-dark">Camera Canon EOS M50 Kit</a>
                          <p class="text-muted small">Matrix: 25 Mpx <br> Brand: Canon</p>
                        </figcaption>
                      </figure>
                    </td>
                    <td>
                      <select class="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </td>
                    <td>
                      <div class="price-wrap">
                        <var class="price">$1156.00</var>
                        <small class="text-muted"> $315.20 each </small>
                      </div>
                    </td>
                    <td class="text-right d-none d-md-block">
                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                    <a href="" class="btn btn-light"> Remove</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <figure class="itemside align-items-center">
                        <div class="aside"><img src="bootstrap-ecommerce-html/images/items/2.jpg" class="img-sm"/></div>
                        <figcaption class="info">
                          <a href="#" class="title text-dark">ADATA Premier ONE microSDXC</a>
                          <p class="text-muted small">Size: 256 GB  <br> Brand: ADATA </p>
                        </figcaption>
                      </figure>
                    </td>
                    <td>
                      <select class="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </td>
                    <td>
                      <div class="price-wrap">
                        <var class="price">$149.97</var>
                        <small class="text-muted"> $75.00 each </small>
                      </div>
                    </td>
                    <td class="text-right d-none d-md-block">
                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                    <a href="" class="btn btn-light btn-round"> Remove</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <figure class="itemside align-items-center">
                        <div class="aside"><img src="bootstrap-ecommerce-html/images/items/3.jpg" class="img-sm"/></div>
                        <figcaption class="info">
                          <a href="#" class="title text-dark">Gamepad Sony DualShock 4</a>
                          <p class="small text-muted">Version: CUH-ZCT2E  <br> Brand: Sony</p>
                        </figcaption>
                      </figure>
                    </td>
                    <td>
                      <select class="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </td>
                    <td>
                      <div class="price-wrap">
                        <var class="price">$98.00</var>
                        <small class="text-muted"> $578.00 each</small>
                      </div>
                    </td>
                    <td class="text-right d-none d-md-block">
                      <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                      <a href="" class="btn btn-light btn-round"> Remove</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

export default CheckoutPage;
