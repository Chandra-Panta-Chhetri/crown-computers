import React from "react";
import {
  SpecificationContainer,
  SpecificationDetail,
  SpecificationLabel
} from "./product-specification-label.styles";

const ProductSpecificationLabel = ({ label, value }) => (
  <SpecificationContainer>
    <SpecificationLabel>{label}</SpecificationLabel>
    <SpecificationDetail>{value}</SpecificationDetail>
  </SpecificationContainer>
);

export default ProductSpecificationLabel;
