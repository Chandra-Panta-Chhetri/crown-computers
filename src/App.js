import React from "react";
import "./App.css";

import NavBar from "./components/navbar/navbar.component";
import LogIn from "./pages/login/login.component";
import SignUp from "./pages/signup/signup.component";
import CartSummary from "./pages/cart-summary/cart-summary.component";
import ProductCollection from "./pages/product-collection/product-collection.component";
import Home from "./pages/home/home.component";
import { Route, Switch, Redirect } from "react-router-dom";

import { auth, addUserToDb } from "./utils/firebase";
import { setCurrentUser } from "./redux/users/user.actions";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/users/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return setCurrentUser(null);
      }
      const userRef = await addUserToDb(user, {
        displayName: user.displayName
      });
      userRef.onSnapshot((snapShot) =>
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        })
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product-collection" component={ProductCollection} />
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <LogIn />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
          />
          <Route exact path="/cart-summary" component={CartSummary} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
