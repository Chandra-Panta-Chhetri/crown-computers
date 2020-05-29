import React from "react";
import "./menu-item.styles.scss";

export const MenuItem = ({ label, imageUrl, size }) => {
  return (
    <div className={`menu-item ${size}`}>
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
