import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { getToken } from './utils/common';

import { Main } from './Main';

import { AuthPage } from './containers/Auth';
import { HomePage } from './containers/Home';
import { AccountPage } from './containers/Account';
import { AddArtPage } from './containers/AddArt';
import { EditArtPage } from './containers/EditArt';
import { ProfilePage } from './containers/Profile';
import { MyArtPage } from './containers/MyArt';
import { ArtDetailPage } from './containers/ArtDetail';
import { AddToCartPage } from './containers/AddToCart';
import { CheckoutPage } from './containers/Checkout';
import { OrderHistoryPage } from './containers/OrderHistory';
import { OrderDetailPage } from './containers/OrderDetail';
import { UsersPage } from './containers/Users';
import { ProductsPage } from './containers/Products';
import { ReviewList } from './containers/ReviewList';

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
    <>
      <Redirect from="/" to="/home" />
      <Route path="/" component={Main} />
      <Route path="/home" component={HomePage} />
      <Route path="/art/:id" component={ArtDetailPage} />
      <Route path="/cart" component={AddToCartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route exact path="/account" component={AccountPage} />
      <Route path="/account/add-art" component={AddArtPage} />
      <Route path="/account/edit-art/:id" component={EditArtPage} />
      <Route path="/account/my-art" component={MyArtPage} />
      <Route path="/account/profile" component={ProfilePage} />
      <Route exact path="/account/orders" component={OrderHistoryPage} />
      <Route exact path="/account/orders/:id" component={OrderDetailPage} />
      <Route path="/account/users" component={UsersPage} />
      <Route path="/account/products" component={ProductsPage} />
      <Route path="/account/reviews/:id" component={ReviewList} />
    </>
  );
}

function PublicRoutes() {
  return (
    <>
      <Redirect from="/" to="/home" />
      <Route path="/" component={Main} />
      <Route path="/home" component={HomePage} />
      <Route path="/art/:id" component={ArtDetailPage} />
      <Route path="/cart" component={AddToCartPage} />
      <Route path="/auth" component={AuthPage} />
    </>
  );
}

function AuthLogic({ }) {
  const isLoggedIn = getToken() ? true : false;
  return (
    isLoggedIn ? <PrivateRoute /> : <PublicRoutes />
  );
}

export { Routes };