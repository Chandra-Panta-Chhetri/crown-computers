import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/homepage/homepage.component";
import { Header } from "./components/header/header.component";
import Shop from "./pages/shop/shop.component";
import LogIn from "./pages/login/login.component";
import { auth } from "./configs/firebaseConfig";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentWillMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
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
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={Shop} />
            <Route path="/login" component={LogIn} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
