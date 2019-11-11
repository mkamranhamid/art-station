import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { getToken } from './utils/common';

import { AuthPage } from './pages/Auth';
import { HomePage } from './pages/Home';

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
      <Redirect from="/" to="/home" />
      <Route path="/home" component={HomePage} />
    </div>
  );
}

function PublicRoutes() {
  return (
    <div>
      <Redirect from="/" to="/auth" />
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