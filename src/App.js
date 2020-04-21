import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import {getCartItemsFromLocalStorage} from './util/util';
import { getCategories } from './api/categories';
import {checkLoggedIn, logoutUser} from './api/users';

import './App.css';
import HomePage from './pages/homepage/homepage';
import CollectionPage from './pages/collection/collection-page';
import ItemPage from './pages/item/item-page';
import SearchResultPage from './pages/search-result/search-result-page';
import CartPage from './pages/cart/cart-page';
import LoginPage from './pages/login/login-page';
import SignUpPage from './pages/signup/signup-page';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import SubNavBar from './components/sub-navbar/sub-navbar';

//App component will serve as our router to render all other components.
//also manage the app's state and authentication status.
//we use the component’s state to maintain the logged in status of a User,
//and to store the User data when we request it from the server.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      categories: [],
      category: '0',
      keyword: '',
      searchFormSubmitted: false,
      province: {}
    }
  }

  async componentDidMount() {
    try {
      await getCategories().then(categories => {
        this.setState({ categories: categories });
      }).catch(error => {
        console.log("HomePage Compo - componentDidMount - *getCategories", error);
      });


      this.loginStatus();

    } catch(error) {
      console.log(error);
    }
  }

  loginStatus = () => {
    checkLoggedIn().then(data => {
      if(data.logged_in) {
        this.handleLogin(data);
      } else {
        this.handleLogout();
      }
    })
    .catch(error => { console.log("App Compo - loginStatus - *checkLoggedIn", error) })
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
      province: data.province
    });
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
      province: {}
    })

    // logoutUser.then(data => {
    //   this.setState({
    //     isLoggedIn: false,
    //     user: {}
    //   });
    //   this.props.history.push('/');
    // }).catch(error => {
    //   console.log("App Compo - handleLogout - *logoutUser", error);
    // })
  }

  // //not using now
  // onLogoutBtnClick = () => {
  //   logoutUser().then(data => {
  //     this.handleLogout();
  //     this.props.history.push('/');
  //   }).catch(error => {
  //     console.log("App Compo - handleLogout - *logoutUser", error);
  //   })
  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitSearch = e => {
    this.setState({searchFormSubmitted: true});
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Header categories={this.state.categories} onChange={this.onChange} user={this.state.user}
                onSubmitSearch={this.onSubmitSearch} loggedInStatus={this.state.isLoggedIn}
                handleLogout={this.handleLogout} />
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route exact path="/" render={props => (<HomePage {...props} loggedInStatus={this.state.isLoggedIn} />)} />
          {/* <Route exact path="/categories/:id" component={CollectionPage} /> */}
          <Route exact path="/categories/:id" render={(props) => (<CollectionPage {...props} {...this.state} />)} />
          <Route exact path="/products/:id" component={ItemPage} />
          <Route exact path="/search" component={SearchResultPage} />
          <Route exact path="/cart"
            render={props => (<CartPage {...props} loggedInStatus={this.state.isLoggedIn}
                                user={this.state.user} province={this.state.province} />)} />
          <Route exact path="/login"
            render={props => (<LoginPage {...props} handleLogin={this.handleLogin}
                                loggedInStatus={this.state.isLoggedIn} />)} />
          <Route exact path="/signup"
            render={props => (<SignUpPage {...props} handleLogin={this.handleLogin}
                                loggedInStatus={this.state.isLoggedIn} />)} />
          {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
        </Switch>

        <Footer/>
      </div>
    );
  }
}

export default App;
