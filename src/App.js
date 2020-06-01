import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/homepage/homepage.component.jsx";
import Shop from "./pages/shop/shop.component.jsx";
import { Header } from "./components/header/header.component.jsx";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
        </Switch>
      </div>
    </Router>
  );
}
