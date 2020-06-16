import React from "react";
import "./directory.styles.scss";
import DIRECTORY_ITEMS from "./directoryItems";

import ProductCategory from "../product-category/product-category.component";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: DIRECTORY_ITEMS
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.menuItems.map((item) => (
          <ProductCategory
            key={item.id}
            label={item.label}
            imageUrl={item.image}
          />
        ))}
      </div>
    );
  }
}

export default Directory;
