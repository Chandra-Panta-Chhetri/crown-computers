import React from "react";
import "./jumbotron.styles.scss";
import { Button } from "../button/button.component";
import { withRouter } from "react-router-dom";

const Jumbotron = ({ history }) => {
  return (
    <div className="jumbotron">
      <h1 className="title">Welcome to Crown Computers!</h1>
      <h4 className="subtitle">A one-stop shop for all your computer needs</h4>
      <Button onClick={() => history.push("/collection")}>
        Browse Collection
      </Button>
    </div>
  );
};

export default withRouter(Jumbotron);
