import React from "react";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

import { selectCollectionFromKeys } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";
import { getShopDataFromDb } from "../../utils/firebaseConfig";

class ProductCollection extends React.Component {
  async componentDidMount() {
    const productCollection = await getShopDataFromDb();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="product-collection">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:productCategory`}
          component={CategoryCollection}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: selectCollectionFromKeys(state)
});

export default connect(mapStateToProps)(ProductCollection);
