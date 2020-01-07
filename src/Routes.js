import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { getToken } from './utils/common';

import { Main } from './Main';
import { AuthPage } from './containers/Auth';
import { HomePage } from './containers/Home';
import { AccountPage } from './containers/Account';
import { AddArtPage } from './containers/AddArt';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/home" component={HomePage} /> */}
        <AuthLogic />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute() {
  return (
    <div>
      {/* <Redirect from="/" to="/home" /> */}
      <Route path="/" component={Main} />
      <Route path="/home" component={HomePage} />
      <Route exact path="/account" component={AccountPage} />
      <Route path="/account/add-art" component={AddArtPage} />
    </div>
  );
}

function PublicRoutes() {
  return (
    <div>
      <Redirect from="/" to="/auth" />
      <Route path="/" component={Main} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/home" component={HomePage} />
    </div>
  );
}

function AuthLogic({ }) {
  const isLoggedIn = getToken() ? true : false;
  return (
    isLoggedIn ? <PrivateRoute /> : <PublicRoutes />
  );
}

export { Routes };