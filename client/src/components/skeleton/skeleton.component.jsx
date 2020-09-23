import React from "react";
import { SkeletonContainer } from "./skeleton.styles";

const Skeleton = ({ width = "100%", height = "100%", margin = "0" }) => (
  <SkeletonContainer width={width} height={height} margin={margin} />
);

export default Skeleton;
