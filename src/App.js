import React from "react";
import "./App.css";
import { HomePage } from "./pages/homepage/homepage.component.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shops" component={Shop} />
        </Switch>
      </div>
    </Router>
  );
}
