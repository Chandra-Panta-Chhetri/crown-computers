import React from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";
import withSpinner from "../../components/with-spinner/with-spinner.component";

import { selectCollectionFromKeys } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";
import { getShopDataFromDb } from "../../utils/firebaseUtils";
import { firestore } from "../../utils/firebaseConfig";
import { setProductCollection } from "../../redux/collection/collection.actions";

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CategoryCollectionWithSpinner = withSpinner(CategoryCollection);

class ProductCollection extends React.Component {
  state = {
    isLoadingItems: true
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const categoriesCollectionRef = firestore.collection("product_categories");
    this.unsubscribeFromSnapshot = categoriesCollectionRef.onSnapshot(
      async (categoriesSnapshot) => {
        const productCollection = await getShopDataFromDb(categoriesSnapshot);
        this.props.setProductCollection(productCollection);
        this.setState({ isLoadingItems: false });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { isLoadingItems } = this.state;
    return (
      <ProductCollectionContainer spinnerActive={isLoadingItems}>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              loading={isLoadingItems}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:productCategory`}
          render={(props) => (
            <CategoryCollectionWithSpinner
              loading={isLoadingItems}
              {...props}
            />
          )}
        />
      </ProductCollectionContainer>
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
