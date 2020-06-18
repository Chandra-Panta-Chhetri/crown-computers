import React from "react";
import "./App.css";
import Header from "./components/header/header.component";
import Collection from "./pages/collection/collection.component";
import LogIn from "./pages/login/login.component";
import SignUp from "./pages/signup/signup.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./pages/home/home.component";
import { auth, addUserToDb } from "./utils/firebase";
import { setCurrentUser } from "./redux/users/user.actions";
import { connect } from "react-redux";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentWillMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await addUserToDb(user, {
          displayName: user.displayName
        });
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/collection" component={Collection} />
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <LogIn />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
