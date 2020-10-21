import React from "react";
import { HomeContainer } from "./home.styles";

import BrowseByCategory from "../../components/browse-by-category/browse-by-category.component";
import Jumbotron from "../../components/jumbotron/jumbotron.component";

const Home = () => (
  <HomeContainer>
    <Jumbotron />
    <h2>Browse By Category</h2>
    <BrowseByCategory />
  </HomeContainer>
);

export default Home;
