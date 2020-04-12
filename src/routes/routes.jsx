import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/homepage/HomePage';
import CollectionPage from '../pages/collection/CollectionPage';
import ItemPage from '../pages/item/ItemPage'
import SearchResultPage from '../pages/searchResult/SearchResultPage';

export const routes = (
  <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categories/:id" component={CollectionPage} />
        <Route exact path="/products/:id" component={ItemPage} />
        <Route exact path="/search" component={SearchResultPage} />
        {/* <Route exact path="/login" component={LoginPage} />
        <Route exact path='/asset-management' component={AssetManagementTable} />
        <Route exact path='/create-procedure' component={CreateProcedure} /> */}
      </Switch>
  </Router>
);
