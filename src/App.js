import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import HomePage from "./page/homepage/homepage.component";
import ShopPage from "./page/shop/shop.component";
import SignInAndSignUpPage from "./page/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubcribeFormAuth = null;

  componentDidMount() {
    this.unsubcribeFormAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubcribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact component={HomePage} path="/" />
          <Route component={ShopPage} path="/shop" />
          <Route component={SignInAndSignUpPage} path="/signin" />
        </Switch>
      </div>
    );
  }
}

export default App;
