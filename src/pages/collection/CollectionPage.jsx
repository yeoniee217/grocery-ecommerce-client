import React from 'react';
import { Redirect } from 'react-router-dom'

import {getCategories} from '../../api/categories';
import {getProductsByCategory} from '../../api/products';

import './CollectionPage.styles.scss';
import Header from '../../components/header/Header';
import CollectionItem from '../../components/collection-item/CollectionItem';
import SubNavBar from '../../components/sub-navbar/SubNavBar';
import CollectionSection from '../../components/collection-section/CollectionSection';
import SideFilter from '../../components/side-filter/SideFilter';

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      radioBtn: 'all',
      category: '0',
      keyword: '',
      searchFormSubmitted: false,
      categoryLinkClicked: false,
      categoryName: ''
    }
  }

  async componentDidMount() {
    try {
      const categoryID = this.props.match.params.id;
      //for filter, use query parameters(query string) instead of '/new' ? thinkso
      let filter = (this.state.radioBtn != 'all') ? `/${this.state.radioBtn}` : '';

      const categories = await getCategories().catch(error => {
                            console.log('There has been a problem with your *getCategories request: ' + error.message);
                          });
      console.log('2',categories);

      const products = await getProductsByCategory(categoryID, filter).catch(error => {
                          console.log('There has been a problem with your *getProductsByCategory request: ' + error.message);
                        });

      this.setState({ categories: categories, products: products, categoryName: products[0].category_name });
    } catch(error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const categoryID = this.props.match.params.id;
    if (categoryID !== prevProps.match.params.id || this.state.radioBtn !== prevState.radioBtn || this.state.categoryLinkClicked) {
      try {
        let filter = (this.state.radioBtn !== 'all') ? `/${this.state.radioBtn}` : '';
        const products = await getProductsByCategory(categoryID, filter).catch(error => {
                            console.log('There has been a problem with your *getProductsByCategory request: ' + error.message);
                          });
        console.log('produc', products);

        if(categoryID !== prevProps.match.params.id || this.state.categoryLinkClicked) {
          console.log('1');
          this.setState({radioBtn: "all"});
        }

        console.log('2');
        this.setState({ products: products, categoryLinkClicked: false, categoryName: products.length ? products[0].category_name : prevState.categoryName });
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

  onSubmitSearch = e => {
    console.log(e);
    this.setState({searchFormSubmitted: true});
  }

  onCategoryClick = e => {
    console.log(this.state);
    this.setState({ categoryLinkClicked: !this.state.categoryLinkClicked });
  }

  render() {
    console.log('render collectionpage');
    console.log(this.state);
    if(this.state.searchFormSubmitted) {
      return <Redirect to={{pathname: '/search',
                            search: `?category=${this.state.category}&keyword=${this.state.keyword}`}} />
    }

    return (
      <div className="">
        <Header categories={this.state.categories}
                onChange={this.onChange}
                onSubmitSearch={this.onSubmitSearch} />
        <SubNavBar categories={this.state.categories} onCategoryClick={this.onCategoryClick} />
        <div style={{marginLeft:"10%", display:"flex"}}>
          <SideFilter categoryName={this.state.categoryName}  radioBtn={this.state.radioBtn}
                      onChange={this.onChange} showCategoryName={true}/>
          <CollectionSection products={this.state.products}/>
        </div>

      </div>
    );
  }

}

export default CollectionPage;
