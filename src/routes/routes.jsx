import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/homepage/HomePage';
// import App from '../App';
import CollectionPage from '../pages/collection/CollectionPage';

export const routes = (
  <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/categories/:id" component={CollectionPage} />
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path='/asset-management' component={AssetManagementTable} />
        <Route exact path='/create-procedure' component={CreateProcedure} /> */}
      </Switch>
  </Router>
);
