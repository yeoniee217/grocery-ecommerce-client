import React from 'react';

import {getCategories} from '../../api/categories';
import {getCartItemsFromLocalStorage} from '../../util/util';
import {formatCurrency} from '../../util/util'

import './cart-page.styles.scss'
import Header from '../../components/header/header';
import SubNavBar from '../../components/sub-navbar/sub-navbar';
import CartSection from '../../components/cart-section/cart-section';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      cartItems: [],
      invoice: [],
      subtotal: null,
      checkedout: false,
      placedOrder: false
    }
  }

  async componentDidMount() {
    console.log(this.props.province); //empty {}

    await getCategories().then(categories => {

      let cartItems = getCartItemsFromLocalStorage();
      console.log(cartItems);

      let subtotal = 0;
      let invoice = [];
      cartItems.forEach(item => {
        let element = {};
        element["name"] = `${item.name}`;
        element["text"] = `${item.quantity} X ${formatCurrency(item.price/100)} = ${formatCurrency((item.quantity * item.price)/100)}`;
        invoice.push(element);
        subtotal += (item.price * item.quantity)/100;
      });

      this.setState({
        categories: categories,
        cartItems: cartItems,
        subtotal: subtotal,
        invoice: invoice,

      });
    }).catch(error => {
      console.log("CartPage Compo - componentDidMount - *getCategories", error);
    });

    console.log(this.state);
  }

  handleRemoveFromCart = (e, item) => {
    console.log(item);
    this.setState(state => {
      const cartItems = state.cartItems.filter(cartItem => cartItem.id !== item.id)

      let subtotal = 0;
      let invoice = [];
      cartItems.forEach(item => {
        let element = {};
        element["name"] = `${item.name}`;
        element["text"] = `${item.quantity} X ${formatCurrency(item.price/100)} = ${formatCurrency((item.quantity * item.price)/100)}`;
        invoice.push(element);
        subtotal += (item.price * item.quantity)/100;
      });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {cartItems, subtotal, invoice};
    });
  }

  onQuantityChange = (e, item) => {
    // e.preventDefault();
    console.log('hiii');
    let cartItems = getCartItemsFromLocalStorage();

    let cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if(cartItem) {
      cartItem.quantity = parseInt(e.target.value);
    }

    let subtotal = 0;
    let invoice = [];
    cartItems.forEach(item => {
      let element = {};
      element["name"] = `${item.name}`;
      element["text"] = `${item.quantity} X ${formatCurrency(item.price/100)} = ${formatCurrency((item.quantity * item.price)/100)}`;
      invoice.push(element);
      subtotal += (item.price * item.quantity)/100;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.setState({cartItems: cartItems, subtotal: subtotal, invoice: invoice});

    // this.setState(state => {
    //   //track cartItems var***!
    //   const cartItems = state.cartItems;
    //   cartItems.forEach(item => {
    //     if(product.id === item.id) {
    //       productAlreadyInCart = true;
    //       // item.count++;
    //     }
    //   });
    //   if(!productAlreadyInCart) {
    //     cartItems.push({ ...product, quantity: 1 }); //push product into the state cartItems array
    //   }

    //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //   console.log(this.state);
      return cartItems; // this line sets state??? where this line setting state??
    // });
  }

  onCheckoutClick = () => {
    // const {GST_rate, PST_rate, HST_rate} = this.state;
    // let GST = GST_rate? this.state.subtotal*GST_rate : 0;
    // let PST = PST_rate? this.state.subtotal*PST_rate : 0;
    // let HST = HST_rate? this.state.subtotal*HST_rate : 0;
    this.setState({
      checkedout: true,

    });
  }

  onPlaceOrderClick = () => {
    this.setState({
      placedOrder: true,

    });
  }

  onPayWithCardClick = () => {
    this.setState({
      placedOrder: true,

    });
  }

  renderInvoiceTaxesPart = () => {
    const {GST_rate, PST_rate, HST_rate} = this.props.province;
    let GST = GST_rate? this.state.subtotal*GST_rate : 0;
    let PST = PST_rate? this.state.subtotal*PST_rate : 0;
    let HST = HST_rate? this.state.subtotal*HST_rate : 0;
    return (
      [
        <li class="list-group-item font-weight-bold">
          GST: <span style={{float:"right"}}>{GST !==0? formatCurrency(GST) : "$0"}</span>
        </li>,
        <li class="list-group-item font-weight-bold">
          PST: <span style={{float:"right"}}>{PST !==0? formatCurrency(PST): "$0"}</span>
        </li>,
        <li class="list-group-item font-weight-bold">
          HST: <span style={{float:"right"}}>{HST !==0? formatCurrency(HST): "$0"}</span>
        </li>,
        <li class="list-group-item font-weight-bold">
          Total Amount:
            <span style={{float:"right"}}>{formatCurrency(this.state.subtotal + GST + PST + HST)}</span>
        </li>
      ]
    );
  }

  render() {
    console.log(this.props);
    // const {GST_rate, PST_rate, HST_rate} = this.props.province;
    return (
      <div>
        {/* <Header categories={this.state.categories}/> */}
        <SubNavBar categories={this.state.categories}/>
        <div class="container" style={{marginTop:"4.5%"}}>
          <h3 class="font-weight-bold">Your Shopping Cart</h3>
        {
          this.state.cartItems.length === 0 ?
            <div class="container">
              <p class="font-weight-bold" style={{textAlign:"center",fontSize:"2rem",marginTop:"10%"}}>
                Your cart is empty.
              </p>
            </div>
          :
            <div class="row mt-4">
              <CartSection cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}
                onQuantityChange={this.onQuantityChange}/>
              <div class="col-md-3">
                <div class="card bg-light" style={{width:"100%"}}>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold mb-5">Order Summary ({this.state.cartItems.length} items)</h5>
                    {
                      this.state.invoice ?
                        this.state.invoice.map(element => {
                          return (
                            <div style={{borderBottom:"1px solid rgba(0,0,0,.125)"}}>
                              <p class="card-text mt-4 font-weight-bold">{element["name"]}</p>
                              <p class="card-text mb-4">{element["text"]}</p>
                            </div>
                          )
                        })
                      :
                        null
                    }
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item font-weight-bold">
                      Subtotal: <span style={{float:"right"}}>{formatCurrency(this.state.subtotal)}</span>
                    </li>
                    {
                      this.state.checkedout ?
                        this.renderInvoiceTaxesPart()
                      :
                        null
                    }
                  </ul>
                  <div class="card-body">
                    {
                      !this.state.checkedout ?
                        <button type="button" onClick={this.onCheckoutClick} class="btn btn-success">Proceed to Checkout</button>
                      :
                        !this.state.placedOrder ?
                          <button type="button" onClick={this.onPlaceOrderClick} class="btn btn-primary">Place your order</button>
                        :
                          <button type="button" onClick={this.onPlaceOrderClick} class="btn btn-primary">Pay with Card</button>
                    }
                  </div>
                </div>
              </div>
            </div>
        }
        </div>
      </div>
    );
  }
}

export default CartPage;
