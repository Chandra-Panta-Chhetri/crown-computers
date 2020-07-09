import React from "react";
import "./category-directory.styles.scss";

import { withRouter } from "react-router-dom";

const CategoryDirectory = ({ label, imageUrl, history, routePath }) => (
  <div
    className="category-directory"
    onClick={() => history.push(`/product-collection/${routePath}`)}
  >
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="category-directory-img"
    ></div>
    <div className="category-directory-content">
      <h1 className="category-title">{label.toUpperCase()}</h1>
      <p className="category-subtitle">SHOP NOW</p>
    </div>
  </div>
);

export default withRouter(CategoryDirectory);
