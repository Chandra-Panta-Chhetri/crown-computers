import React, { useEffect } from "react";
import { DirectoryContainer } from "./directory.styles";

import CategoryDirectory from "../category-directory/category-directory.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCategories } from "../../redux/directory/directory.selectors";
import { startCategoriesFetch } from "../../redux/directory/directory.actions";

const Directory = ({ productCategories, getProductCategories }) => {
  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

  return (
    <DirectoryContainer>
      {productCategories.map(({ id, ...otherProductFields }) => (
        <CategoryDirectory key={id} {...otherProductFields} />
      ))}
    </DirectoryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories
});

const mapDispatchToProps = (dispatch) => ({
  getProductCategories: () => dispatch(startCategoriesFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
