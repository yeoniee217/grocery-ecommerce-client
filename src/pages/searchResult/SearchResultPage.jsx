import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

import {getCategories} from '../../api/categories';
import { searchProducts } from '../../api/products';

import Header from '../../components/header/Header';
import SubNavBar from '../../components/sub-navbar/SubNavBar';
import CollectionSection from '../../components/collection-section/CollectionSection';
import SideFilter from '../../components/side-filter/SideFilter';

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: []
    }
  }

  async componentDidMount() {
    try {
      // const params2 = new URLSearchParams(this.props.location.search);
      // console.log('first param', params2.get("category"));
      // console.log('second param', params2.get("keyword"));

      let formData = new FormData();
      const params = queryString.parse(this.props.location.search);  //more stable solution than params2
      formData.append('category', params["category"]);
      formData.append('keyword', params["keyword"]);

      //refactor to use Promise.all()
      const categories = await getCategories().catch(error => {
                            console.log('There has been a problem with your *getCategories request: ' + error.message);
                          });
      const searchedProducts = await searchProducts(formData).catch(error => {
                                  console.log('There has been a problem with your *searchProducts request: ' + error.message);
                                });;

      this.setState({ categories: categories, products: searchedProducts });
    } catch(error) {
      console.log(error);
    }
  }


  render() {
    //to do: fix the side filter for this page!
    return (
      <div>
        <Header categories={ this.state.categories } />
        <SubNavBar categories={ this.state.categories } />
        <div style={{marginLeft:"10%", display:"flex"}}>
          <SideFilter/>
          <CollectionSection products={this.state.products}/>
          {/* <SideFilter radioBtn={this.state.radioBtn}
                      onClickFilter={this.onClickFilter} />
          <CollectionSection products={this.state.products}/> */}
        </div>
      </div>
    )
  }
}

export default SearchResultPage;
