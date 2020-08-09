import React, { useEffect, lazy } from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { startCollectionFetch } from "../../redux/collection/collection.actions";
import { selectIsFetchingCollection } from "../../redux/collection/collection.selectors";

const CollectionOverview = lazy(() =>
  import("../../components/collection-overview/collection-overview.component")
);

const CategoryCollection = lazy(() =>
  import("../../components/category-collection/category-collection.component")
);

const ProductCollection = ({
  startCollectionFetch,
  match,
  isFetchingItems
}) => {
  useEffect(() => {
    startCollectionFetch();
  }, [startCollectionFetch]);

  return (
    <ProductCollectionContainer spinnerActive={isFetchingItems}>
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route
        path={`${match.path}/:productCategory`}
        component={CategoryCollection}
      />
    </ProductCollectionContainer>
  );
};

const mapStateToProps = (state) => ({
  isFetchingItems: selectIsFetchingCollection(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCollectionFetch: () => dispatch(startCollectionFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);
