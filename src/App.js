import React from "react";
import "./App.css";
import { HomePage } from "./pages/homepage.component.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/hats">
            <h1>Hats</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
