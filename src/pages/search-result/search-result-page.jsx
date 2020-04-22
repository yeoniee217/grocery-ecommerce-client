import React from 'react';
import queryString from 'query-string';

import {getCategories} from '../../api/categories';
import { searchProducts } from '../../api/products';

import Header from '../../components/header/header';
import SubNavBar from '../../components/sub-navbar/sub-navbar';
import CollectionSection from '../../components/collection-section/collection-section';
import SideFilter from '../../components/side-filter/side-filter';

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      category: '0',
      keyword: '',
    }
  }

  async componentDidMount() {
    try {
      // no need to use FormData
      // let formData = new FormData();
      // formData.append('category', params["category"]);
      // formData.append('keyword', params["keyword"]);

      const queryParams = this.getQueryParams();
      //refactor to use Promise.all(), try out axios get /user?ID=413 for searchProducts request
      const categories = await getCategories();
      const searchedProducts = await searchProducts(queryParams);
      this.setState({ categories: categories, products: searchedProducts });
    } catch(error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      const queryParams = this.getQueryParams();
      const searchedProducts = await searchProducts(queryParams);
      this.setState({ products: searchedProducts });
    }

  }

  getQueryParams = () => {
    const params = queryString.parse(this.props.location.search);  //more stable solution than params2
    const queryParams = {
      params: {
        categoryID: params["categoryID"],
        keyword: params["keyword"]
      }
    };

    return queryParams;
    // // diff way to get query string(query params) from url
    // const params2 = new URLSearchParams(this.props.location.search);
    // console.log('first param', params2.get("category"));
    // console.log('second param', params2.get("keyword"));
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log(event.target.value);
  }

  render() {
    console.log(this.state);
    //to do: fix the side filter for this page!
    return (
      <div>
        {/* <Header categories={ this.state.categories }
                onChange={this.onChange}
                onSubmitSearch={this.onSubmitSearch}/> */}
        <SubNavBar categories={ this.state.categories } />
          {
            this.state.products.length !== 0 ?
              <div style={{marginLeft:"10%", display:"flex"}}>
                <SideFilter/>
                <CollectionSection products={this.state.products}/>
              </div>
            :
              <div class="container">
                <p class="font-weight-bold" style={{textAlign:"center",fontSize:"2rem",marginTop:"10%"}}>
                  No results found.
                </p>
              </div>
          }
          {/* <SideFilter radioBtn={this.state.radioBtn}
                      onClickFilter={this.onClickFilter} />
          <CollectionSection products={this.state.products}/> */}
      </div>
    )
  }
}

export default SearchResultPage;
