import React, { useEffect } from "react";
import {
  CategoryImagePreview,
  ProductCategoryEntryContainer,
  CategoriesList
} from "./dashboard-product-category.styles";

import Card from "../card/card.component";
import Skeleton from "../skeleton/skeleton.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCategoriesPerPage,
  selectHasMoreCategoriesToFetch,
  selectIsFetchingCategories,
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
  fetchMoreCategories
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
      <CategoriesList>
        {(categories || []).map(({ category, categoryId, imageUrl }, index) => (
          <ProductCategoryEntryContainer key={index}>
            <Card>
              <div>
                <CategoryImagePreview src={imageUrl} alt={category} />
                <span style={{ textTransform: "capitalize" }}>{category}</span>
              </div>
            </Card>
          </ProductCategoryEntryContainer>
        ))}
        {isFetchingCategories && (
          <Skeleton
            height="150px"
            margin="0 0 40px 0"
            count={categoriesPerPage}
          />
        )}
      </CategoriesList>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectProductCategories,
  categoriesPerPage: selectCategoriesPerPage,
  isFetchingCategories: selectIsFetchingCategories,
  hasMoreCategoriesToFetch: selectHasMoreCategoriesToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(startInitialCategoriesFetch()),
  fetchMoreCategories: () => dispatch(startLoadingMoreCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardProductCategories);
