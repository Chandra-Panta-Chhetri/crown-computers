import React from "react";
import "./product-category.styles.scss";

import { withRouter } from "react-router-dom";

const ProductCategory = ({ label, imageUrl, history, match, routePath }) => (
  <div
    className={`product-category`}
    onClick={() => history.push(`/collection/${routePath}`)}
  >
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="background-image"
    ></div>
    <div className="content">
      <h1 className="title">{label.toUpperCase()}</h1>
      <p className="subtitle">SHOP NOW</p>
    </div>
  </div>
);

export default withRouter(ProductCategory);
