import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home/home.component";
import { Header } from "./components/header/header.component";
import { auth, addUserToDb } from "./utils/firebase";
import Collection from "./pages/collection/collection.component";
import LogIn from "./pages/login/login.component";
import SignUp from "./pages/signup/signup.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentWillMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await addUserToDb(user);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/collection" component={Collection} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
