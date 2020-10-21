import React, { useEffect } from "react";
import { BrowseByCategoryContainer } from "./browse-by-category.styles";

import CategoryDirectory from "../category-directory/category-directory.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import {
  selectProductCategories,
  selectIsFetchingCategories
} from "../../redux/product-category/product-category.selectors";
import { startInitialCategoriesFetch } from "../../redux/product-category/product-category.actions";

const BrowseByCategory = ({
  productCategories,
  fetchInitialCategories,
  isFetchingCategories
}) => {
  useEffect(() => {
    fetchInitialCategories();
  }, [fetchInitialCategories]);

  return (
    <BrowseByCategoryContainer>
      {isFetchingCategories ? (
        <Spinner loadingText="Getting latest categories" />
      ) : (
        productCategories.map(({ id, ...otherProductFields }) => (
          <CategoryDirectory key={id} {...otherProductFields} />
        ))
      )}
    </BrowseByCategoryContainer>
  );
};

const mapStateToProps = (state) => ({
  productCategories: selectProductCategories(state),
  isFetchingCategories: selectIsFetchingCategories(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialCategories: () => dispatch(startInitialCategoriesFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseByCategory);
