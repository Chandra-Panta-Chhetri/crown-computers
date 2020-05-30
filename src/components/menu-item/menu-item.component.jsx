import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";

const MenuItem = ({ label, imageUrl, size, history, match }) => {
  return (
    <div
      className={`menu-item ${size}`}
      onClick={() => history.push(`${match.url}${label}`)}
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
};

export default withRouter(MenuItem);
