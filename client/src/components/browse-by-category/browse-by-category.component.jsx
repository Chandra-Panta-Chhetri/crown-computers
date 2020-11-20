import React, { useEffect } from "react";
import { BrowseByCategoryContainer } from "./browse-by-category.styles";
import { CategoryDirectorySkeleton } from "../category-directory/category-directory.styles";

import CategoryDirectory from "../category-directory/category-directory.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductCategories,
  selectIsFetchingCategories,
  selectCategoriesPerPage,
  selectHasMoreCategoriesToFetch
} from "../../redux/product-category/product-category.selectors";
import {
  startInitialCategoriesFetch,
  startLoadingMoreCategories
} from "../../redux/product-category/product-category.actions";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";

const BrowseByCategory = ({
  productCategories,
  isFetchingCategories,
  categoriesPerPage,
  hasMoreToFetch,
  fetchInitialCategories,
  fetchMoreCategories
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreCategories,
    isFetchingCategories,
    hasMoreToFetch
  );
  useEffect(() => {
    fetchInitialCategories();
  }, [fetchInitialCategories]);

  return (
    <BrowseByCategoryContainer>
      {(productCategories || []).map((category, index) => (
        <CategoryDirectory
          key={index}
          categoryInfo={category}
          intersectionCb={
            productCategories.length === index + 1
              ? fetchMoreOnIntersection
              : undefined
          }
        />
      ))}
      {isFetchingCategories && (
        <CategoryDirectorySkeleton flexGrow count={categoriesPerPage} />
      )}
    </BrowseByCategoryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories,
  isFetchingCategories: selectIsFetchingCategories,
  categoriesPerPage: selectCategoriesPerPage,
  hasMoreToFetch: selectHasMoreCategoriesToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialCategories: () => dispatch(startInitialCategoriesFetch()),
  fetchMoreCategories: () => dispatch(startLoadingMoreCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseByCategory);
