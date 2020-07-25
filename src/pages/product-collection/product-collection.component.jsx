import React from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";
import withSpinner from "../../components/with-spinner/with-spinner.component";

import { connect } from "react-redux";
import { collectionFetchStarted } from "../../redux/collection/collection.actions";
import { selectIsFetchingStatus } from "../../redux/collection/collection.selectors";

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CategoryCollectionWithSpinner = withSpinner(CategoryCollection);

class ProductCollection extends React.Component {
  componentDidMount() {
    this.props.fetchItemsFromDB();
  }

  render() {
    const { match } = this.props;
    const { isFetchingItems } = this.props;
    return (
      <ProductCollectionContainer spinnerActive={isFetchingItems}>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner
              loading={isFetchingItems}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:productCategory`}
          render={(props) => (
            <CategoryCollectionWithSpinner
              loading={isFetchingItems}
              {...props}
            />
          )}
        />
      </ProductCollectionContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchingItems: selectIsFetchingStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsFromDB: () => dispatch(collectionFetchStarted())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);
