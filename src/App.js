import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./page/homepage/homepage.component";
import ShopPage from "./page/shop/shop.component";
import CheckoutPage from "./page/checkout/checkout.component";
import SignInAndSignUpPage from "./page/sign-in-and-sign-up/sign-in-and-sign-up.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubcribeFormAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionArray } = this.props;

    this.unsubcribeFormAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data(),
          //   },
          // });
          // console.log(this.state);
        });
      } else {
        setCurrentUser(userAuth);
      }
      // addCollectionAndDocuments(
      //     "collections",
      //     collectionArray.map(({ title, items }) => ({ title, items }))
      //   );
    });
  }

  componentWillUnmount() {
    this.unsubcribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
