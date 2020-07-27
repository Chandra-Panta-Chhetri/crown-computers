import React from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { startCollectionFetch } from "../../redux/collection/collection.actions";
import { selectIsFetchingCollection } from "../../redux/collection/collection.selectors";

class ProductCollection extends React.Component {
  componentDidMount() {
    const { startCollectionFetch } = this.props;
    startCollectionFetch();
  }

  render() {
    const { match, isFetchingItems } = this.props;
    return (
      <ProductCollectionContainer spinnerActive={isFetchingItems}>
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:productCategory`}
          component={CategoryCollection}
        />
      </ProductCollectionContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchingItems: selectIsFetchingCollection(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCollectionFetch: () => dispatch(startCollectionFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);
