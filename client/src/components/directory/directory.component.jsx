import React, { useEffect } from "react";
import { DirectoryContainer } from "./directory.styles";

import CategoryDirectory from "../category-directory/category-directory.component";

import { connect } from "react-redux";
import {
  selectProductCategories,
  selectIsFetchingCategories
} from "../../redux/directory/directory.selectors";
import { startCategoriesFetch } from "../../redux/directory/directory.actions";
import Spinner from "../spinner/spinner.component";

const Directory = ({
  productCategories,
  getProductCategories,
  isFetchingCategories
}) => {
  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

  return (
    <DirectoryContainer>
      {isFetchingCategories ? (
        <Spinner loadingText="Getting latest categories" />
      ) : (
        productCategories.map(({ id, ...otherProductFields }) => (
          <CategoryDirectory key={id} {...otherProductFields} />
        ))
      )}
    </DirectoryContainer>
  );
};

const mapStateToProps = (state) => ({
  productCategories: selectProductCategories(state),
  isFetchingCategories: selectIsFetchingCategories(state)
});

const mapDispatchToProps = (dispatch) => ({
  getProductCategories: () => dispatch(startCategoriesFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
