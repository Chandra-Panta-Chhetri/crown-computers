import React from "react";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

import { selectCollectionFromKeys } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";
import { getShopDataFromDb } from "../../utils/firebaseUtils";
import { firestore } from "../../utils/firebaseConfig";
import { setProductCollection } from "../../redux/collection/collection.actions";

class ProductCollection extends React.Component {
  unsubscribeFromUpdatingShop = null;

  async componentDidMount() {
    const categoriesCollectionRef = firestore.collection("product_categories");
    this.unsubscribeFromUpdatingShop = categoriesCollectionRef.onSnapshot(
      async (categoriesSnapshot) => {
        const productCollection = await getShopDataFromDb(categoriesSnapshot);
        this.props.setProductCollection(productCollection);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromUpdatingShop();
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

const mapDispatchToProps = (dispatch) => ({
  setProductCollection: (productCollection) =>
    dispatch(setProductCollection(productCollection))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);
