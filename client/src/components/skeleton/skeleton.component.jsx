import React from "react";
import { SkeletonContainer } from "./skeleton.styles";

const Skeleton = ({
  width = "100%",
  height = "100%",
  margin = "0",
  count = 1,
  flexGrow = false
}) => (
  <>
    {Array(count)
      .fill()
      .map((skeleton, index) => (
        <SkeletonContainer
          width={width}
          height={height}
          margin={margin}
          key={index}
          flexGrow={flexGrow}
        />
      ))}
  </>
);

export default Skeleton;
