import React from "react";
import "./App.css";

import NavBar from "./components/navbar/navbar.component";
import LogIn from "./pages/login/login.component";
import SignUp from "./pages/signup/signup.component";
import CartSummary from "./pages/cart-summary/cart-summary.component";
import ProductCollection from "./pages/product-collection/product-collection.component";
import Home from "./pages/home/home.component";
import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  componentDidMount() {}

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

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user))
// });

export default connect(mapStateToProps)(App);
