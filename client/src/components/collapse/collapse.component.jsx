import React, { useState, useRef, useEffect } from "react";
import {
  CollapseContainer,
  CollapseTitle,
  CollapseIcon,
  CollapseContent
} from "./collapse.styles";

const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);
  const contentRef = useRef(null);

  useEffect(() => {
    const collapseContentRef = contentRef.current;
    collapseContentRef.style.maxHeight = isOpen
      ? `${collapseContentRef.scrollHeight}px`
      : "0px";
  }, [contentRef, isOpen]);

  return (
    <CollapseContainer>
      <CollapseTitle onClick={toggleCollapse}>
        <p>{title}</p>
        <CollapseIcon
          className={isOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"}
        ></CollapseIcon>
      </CollapseTitle>
      <CollapseContent isOpen={isOpen} ref={contentRef}>
        {children}
      </CollapseContent>
    </CollapseContainer>
  );
};

export default Collapse;
