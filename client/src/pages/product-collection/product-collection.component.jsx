import React, { useEffect } from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { startCollectionFetch } from "../../redux/collection/collection.actions";
import { selectIsFetchingCollection } from "../../redux/collection/collection.selectors";

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
