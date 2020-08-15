import React from "react";
import { HomeContainer } from "./home.styles";

import Directory from "../../components/directory/directory.component";
import Jumbotron from "../../components/jumbotron/jumbotron.component";

const Home = () => (
  <HomeContainer>
    <Jumbotron />
    <h2>Browse By Category</h2>
    <Directory />
  </HomeContainer>
);

export default Home;
