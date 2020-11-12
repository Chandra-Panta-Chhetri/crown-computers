import React, { useEffect } from "react";
import { ProductList } from "./dashboard-products.styles";
import { DashboardContentTitle } from "../../pages/dashboard/dashboard.styles";

import ProductEntry from "../product-entry/product-entry.component";
import Skeleton from "../skeleton/skeleton.component";
import FullPageSpinner from "../full-page-spinner/full-page-spinner.component";
import NewProductBtn from "../new-product-btn/new-product-btn.component";

import { connect } from "react-redux";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import {
  selectIsFetchingProducts,
  selectHasMoreProductsToFetch,
  selectProductCollection,
  selectProductsPerPage,
  selectIsUpdatingProducts,
  selectProductLoadingText
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "../../redux/product/product.actions";
import { createStructuredSelector } from "reselect";

const MIN_STOCK_QUANTITY = -1;

const DashboardProducts = ({
  isFetchingProducts,
  products,
  productsPerPage,
  hasMoreProductsToFetch,
  fetchProducts,
  fetchMoreProducts,
  isUpdatingProducts,
  productLoadingText
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    () => fetchMoreProducts(MIN_STOCK_QUANTITY),
    isFetchingProducts,
    hasMoreProductsToFetch
  );

  useEffect(() => {
    fetchProducts(MIN_STOCK_QUANTITY);
  }, [fetchProducts]);

  return (
    <>
      <DashboardContentTitle underlineWidth={120}>
        Products
      </DashboardContentTitle>
      <NewProductBtn />
      <ProductList>
        {(products || []).map((product, index) => (
          <ProductEntry
            product={product}
            key={product.productId}
            // intersectionCb={
            //   index + 1 === products.length
            //     ? fetchMoreOnIntersection
            //     : undefined
            // }
          />
        ))}
        {isFetchingProducts && (
          <Skeleton count={productsPerPage} height="300px" margin="0 0 30px" />
        )}
      </ProductList>
      <FullPageSpinner
        isLoading={isUpdatingProducts}
        loadingText={productLoadingText}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  products: selectProductCollection,
  productsPerPage: selectProductsPerPage,
  hasMoreProductsToFetch: selectHasMoreProductsToFetch,
  isUpdatingProducts: selectIsUpdatingProducts,
  productLoadingText: selectProductLoadingText
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (minStockQuantity) =>
    dispatch(startInitialProductsFetch(minStockQuantity)),
  fetchMoreProducts: (minStockQuantity) =>
    dispatch(startLoadingMoreProducts(minStockQuantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProducts);
