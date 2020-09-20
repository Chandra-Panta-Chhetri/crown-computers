import React, { useState } from "react";
import { TabsContainer, TabHeadings, TabHeading } from "./tabs.styles";

const Tabs = ({ children: tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const changeActiveTab = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <TabsContainer>
      <TabHeadings>
        {tabs.map((tabs, index) => (
          <TabHeading
            key={index}
            className={`${index === activeTabIndex ? "active" : ""}`}
            onClick={() => changeActiveTab(index)}
          >
            {tabs.props.tabLabel}
          </TabHeading>
        ))}
      </TabHeadings>
      {tabs.map((tab, index) => {
        if (index !== activeTabIndex) return undefined;
        return tab;
      })}
    </TabsContainer>
  );
};

export default Tabs;
