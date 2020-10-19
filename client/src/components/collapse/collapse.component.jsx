import React, { useState } from "react";
import {
  CollapseContainer,
  CollapseTitle,
  CollapseIcon,
  CollapseContent
} from "./collapse.styles";

const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <CollapseContainer>
      <CollapseTitle onClick={toggleCollapse}>
        <p>{title}</p>
        <CollapseIcon
          className={isOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"}
        ></CollapseIcon>
      </CollapseTitle>
      <CollapseContent isOpen={isOpen}>{children}</CollapseContent>
    </CollapseContainer>
  );
};

export default Collapse;
