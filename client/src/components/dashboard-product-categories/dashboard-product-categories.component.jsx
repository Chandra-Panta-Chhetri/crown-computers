import React, { useEffect } from "react";
import {
  CategoriesList,
  NoCategoriesText
} from "./dashboard-product-category.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import Skeleton from "../skeleton/skeleton.component";
import CategoryEntry from "../category-entry/category-entry.component";
import FullPageSpinner from "../full-page-spinner/full-page-spinner.component";
import NewCategoryBtn from "../new-category-btn/new-category-btn.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCategoriesPerPage,
  selectCategoryLoadingText,
  selectHasMoreCategoriesToFetch,
  selectIsFetchingCategories,
  selectIsUpdatingCategories,
  selectProductCategories
} from "../../redux/product-category/product-category.selectors";
import {
  startInitialCategoriesFetch,
  startLoadingMoreCategories
} from "../../redux/product-category/product-category.actions";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";

const DashboardProductCategories = ({
  categories,
  categoriesPerPage,
  isFetchingCategories,
  hasMoreCategoriesToFetch,
  fetchCategories,
  fetchMoreCategories,
  isUpdatingCategories,
  categoryLoadingText
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreCategories,
    isFetchingCategories,
    hasMoreCategoriesToFetch
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <DashboardContentTitle underlineWidth={260}>
        Product Categories
      </DashboardContentTitle>
      <NewCategoryBtn />
      {!categories.length && !isFetchingCategories && (
        <NoCategoriesText>
          It seems there are no product categories. Create one using the button
          above!
        </NoCategoriesText>
      )}
      <CategoriesList>
        {(categories || []).map((category, index) => (
          <CategoryEntry
            category={category}
            key={category.categoryId}
            intersectionCb={
              categories.length === index + 1
                ? fetchMoreOnIntersection
                : undefined
            }
          />
        ))}
        {isFetchingCategories && (
          <Skeleton
            width="28%"
            height="290px"
            margin="0 10px 40px"
            count={categoriesPerPage}
            flexGrow
          />
        )}
      </CategoriesList>
      <FullPageSpinner
        isLoading={isUpdatingCategories}
        loadingText={categoryLoadingText}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectProductCategories,
  categoriesPerPage: selectCategoriesPerPage,
  isFetchingCategories: selectIsFetchingCategories,
  hasMoreCategoriesToFetch: selectHasMoreCategoriesToFetch,
  isUpdatingCategories: selectIsUpdatingCategories,
  categoryLoadingText: selectCategoryLoadingText
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(startInitialCategoriesFetch()),
  fetchMoreCategories: () => dispatch(startLoadingMoreCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardProductCategories);
