import React from 'react';
import { Redirect } from 'react-router-dom';

import {getCategories} from '../../api/categories';
import {getProductsByCategory} from '../../api/products';
import {getCartItemsFromLocalStorage, flagProductsInCart} from '../../util/util';

import './collection-page.styles.scss';
import SubNavBar from '../../components/sub-navbar/sub-navbar';
import CollectionSection from '../../components/collection-section/collection-section';
import SideFilter from '../../components/side-filter/side-filter';

//Controlled Component
class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      selectedRadioBtn: 'all',
      // category: '0',
      // keyword: '',
      // searchFormSubmitted: false,
      categoryLinkClicked: false,
      categoryName: '',
      cartItems: []
    }
  }

  async componentDidMount() {
    try {
      const categoryID = this.props.match.params.id;
      //for filter, use query parameters(query string) instead of '/new' ?
      let filter = (this.state.selectedRadioBtn != 'all') ? `/${this.state.selectedRadioBtn}` : '';

      const categories = getCategories(); //returns a promise (so categories is a promise obj)**
      console.log('promise 1',categories);

      let products = getProductsByCategory(categoryID, filter);
      console.log('promise 2',products);

      // diff way(than the below) - using .then() method of the Promise**
      await Promise.all([categories, products])  //categories, products are promises*
      .then(values => {
        console.log(categories);
        console.log(products);
        console.log(values);

        let categoryName = values[1] ? values[1][0].category.name : '';

        const cartItems = getCartItemsFromLocalStorage();
        flagProductsInCart(cartItems, values[1]);  //interesting!! dig more**
        // for (const item of cartItems) {
        //   console.log(item);
        //   let product = values[1].find(product => product.id === item.id);
        //   console.log(product);
        //   if(product) {
        //     product.alreadyInCart = true
        //   }
        // }

        this.setState({ categories: values[0], products: values[1],
                        categoryName: categoryName, cartItems: cartItems });
      }).catch(error => {
        console.log("CollectionPage Compo - componentDidMount - Promise.all", error);
      });

      // // use Promise.all() when need to send more than 2 requests to server AND want to run concurrently(parallel)**
      // const all = await Promise.all([categories, products]).catch(error => {
      //               console.log('colPageErrorTest', error)
      //             });
      // console.log(categories);
      // console.log(products);
      // console.log(all);

      // let categoryName = all[1] ? all[1][0].category.name : '';
      // this.setState({ categories: all[0], products: all[1], categoryName: categoryName});

    } catch(error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const categoryID = this.props.match.params.id;
    if (categoryID !== prevProps.match.params.id || this.state.selectedRadioBtn !== prevState.selectedRadioBtn || this.state.categoryLinkClicked) {
      try {
        let filter = (this.state.selectedRadioBtn !== 'all') ? `/${this.state.selectedRadioBtn}` : '';
        let products = await getProductsByCategory(categoryID, filter).catch(error => {
                            console.log('There has been a problem with your *getProductsByCategory request: ' + error.message);
                          });
        console.log('produc', products);

        if(categoryID !== prevProps.match.params.id || this.state.categoryLinkClicked) {
          console.log('1');
          this.setState({selectedRadioBtn: "all"});
        }

        console.log('2');
        let categoryName = products.length ? products[0].category.name : prevState.categoryName;
        const cartItems = getCartItemsFromLocalStorage();
        // console.log(cartItems);
        console.log('this works?');
        flagProductsInCart(cartItems, products); //important!!!***
        this.setState({ products: products, categoryLinkClicked: false,
                        categoryName: categoryName });
      } catch(error) {
        console.log(error);
      }
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log(event.target.value);
  }

  // onSubmitSearch = e => {
  //   console.log(e);
  //   this.setState({searchFormSubmitted: true});
  // }

  onCategoryClick = e => {
    console.log(this.state);
    this.setState({ categoryLinkClicked: !this.state.categoryLinkClicked });
  }

  handleAddToCart = (e, product) => {
    //localStorage.getItem("cartItems") returns string!
    console.log(product);

    product.alreadyInCart = true;
    this.setState(state => {
      //track cartItems var***!
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if(product.id === item.id) {
          productAlreadyInCart = true;
          // quantity.count++;
        }
      });
      if(!productAlreadyInCart) {
        cartItems.push({ ...product, quantity: 1 }); //push product into the state cartItems array
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log(this.state);
      return cartItems; // this line sets state??? where this line setting state??
    });
  }

  render() {
    console.log(this.props);
    if(this.props.searchFormSubmitted) {
      return <Redirect to={{pathname: '/search',
                            search: `?categoryID=${this.props.category}&keyword=${this.props.keyword}`}} />
    }

    return (
      <div className="">
        {/* <Header categories={this.state.categories} onChange={this.onChange}
                onSubmitSearch={this.onSubmitSearch} /> */}
        <SubNavBar categories={this.state.categories} onCategoryClick={this.onCategoryClick} />
        <div style={{marginLeft:"10%", display:"flex"}}>
          <SideFilter categoryName={this.state.categoryName}  selectedRadioBtn={this.state.selectedRadioBtn}
                      onChange={this.onChange} showCategoryName={true} />
          <CollectionSection products={this.state.products}
            handleAddToCart={this.handleAddToCart} />
        </div>

      </div>
    );
  }

}

export default CollectionPage;
