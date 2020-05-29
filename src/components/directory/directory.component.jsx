import React from "react";
import "./directory.styles.scss";
import { MenuItem } from "../menu-item/menu-item.component.jsx";

export const Directory = ({ menuOptions }) => {
  return (
    <div className="directory-menu">
      {menuOptions.map((item) => (
        <MenuItem
          key={item.id}
          label={item.label}
          imageUrl={item.image}
          size={item.size}
        />
      ))}
    </div>
  );
};
