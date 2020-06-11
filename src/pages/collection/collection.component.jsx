import React from "react";
import SHOP_DATA from "./productsData.js";
import "./collection.styles.scss";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

class Collection extends React.Component {
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

export default Collection;
