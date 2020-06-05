import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/homepage/homepage.component";
import { Header } from "./components/header/header.component";
import Shop from "./pages/shop/shop.component";
import LogIn from "./pages/login/login.component";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/login" component={LogIn} />
        </Switch>
      </div>
    </Router>
  );
}
