import React from "react";
import "./home.styles.scss";

import Directory from "../../components/directory/directory.component";
import Jumbotron from "../../components/jumbotron/jumbotron.component";

const Home = () => (
  <div className="home">
    <Jumbotron />
    <h2>Browse By Category</h2>
    <Directory />
  </div>
);

export default Home;
