import React from "react";
import SHOP_DATA from "./shopData.js";
import "./shop.styles.scss";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component.jsx";

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      shopData: SHOP_DATA
    };
  }
  render() {
    return (
      <>
        {this.state.shopData.map(({ id, ...otherCollectionFields }) => {
          return <CollectionPreview key={id} {...otherCollectionFields} />;
        })}
      </>
    );
  }
}

export default Shop;
