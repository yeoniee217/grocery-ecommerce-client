import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/homepage/homepage';
import CollectionPage from '../pages/collection/collection-page';
import ItemPage from '../pages/item/item-page'
import SearchResultPage from '../pages/search-result/search-result-page';
import LoginPage from '../pages/login/login-page';
import SignUpPage from '../pages/signup/signup-page';
import CheckoutPage from '../pages/checkout/checkout-page';

export const routes = (
  <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categories/:id" component={CollectionPage} />
        <Route exact path="/products/:id" component={ItemPage} />
        <Route exact path="/search" component={SearchResultPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        {/* <Route exact path="/login" component={LoginPage} />
        <Route exact path='/asset-management' component={AssetManagementTable} />
        <Route exact path='/create-procedure' component={CreateProcedure} /> */}
      </Switch>
  </Router>
);
