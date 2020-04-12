import React from 'react';

import './ItemPage.styles.scss'
import Header from '../../components/header/Header';
import SubNavBar from '../../components/sub-navbar/SubNavBar';

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      product_id: null,
      product: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/categories.json').then(response => {
      return response.json();
    }).then(json => {
      this.setState({categories: json});
      return json;
    }).then(json => console.log(this.state.categories))
    .catch(error => console.log(error));

    this.fetchProduct(this.props.match.params.id);
  }

  fetchProduct = (product_id) => {
    fetch(`http://localhost:3000/products/${product_id}.json`).then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        this.setState({product: json});
        return json;
      }).then(json => console.log(this.state))
      .catch(error => console.log(error));
  }

  render() {
    const { id, num, name, description, price,
      stock_quantity, discount, imageUrl } = this.state.product || {};

    let currencyFormat = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    });

    return (
      <div>
        <Header categories={ this.state.categories } />
        <SubNavBar categories={ this.state.categories } />
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-5" style={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
              <img
                src={imageUrl}
                alt="grocery image" style={{width:"50%", height:"60%"}}
              />
            </div>
            <div class="col-md-7">
              <p class="new-arrival text-center">NEW</p>
              <h2>{name}</h2>
              <p><b>Product Number</b> {num ? num.toString().padStart(4, '0') : null}</p>
              <p class="price">{currencyFormat.format(price/100)}</p>
              <p>{description}</p>
              <p><b class="mr-1">Availability </b>
                <span class="text-success font-weight-bold">
                {stock_quantity != "0"? stock_quantity:"Out of Stock"}
                </span>
              </p>
              {/* <p><b>Availability:</b>In Stock</p>
              <p><b>Condition:</b>New</p>
              <p><b>Brand:</b>WYZ Company</p> */}
              {/* <label>Quantity: </label>
              <input type="text" value="1"/> */}
              <button type="button" class="btn btn-primary font-weight-bold add-cart-btn mt-3">
                <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ItemPage;
