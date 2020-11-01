import React from "react";
import { HomeContainer } from "./home.styles";

import BrowseByCategory from "../../components/browse-by-category/browse-by-category.component";
import Jumbotron from "../../components/jumbotron/jumbotron.component";
import Button from "../../components/button/button.component";

const Home = ({ history }) => (
  <HomeContainer>
    <Jumbotron
      title="Welcome to Crown Computers!"
      subtitle="A one-stop shop for all your computer needs"
    >
      <Button onClick={() => history.push("/shop")}>Browse Collection</Button>
    </Jumbotron>
    <h2>Browse By Category</h2>
    <BrowseByCategory />
  </HomeContainer>
);

export default Home;
