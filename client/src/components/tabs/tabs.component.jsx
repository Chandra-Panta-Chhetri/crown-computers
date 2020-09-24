import React, { useState } from "react";
import { TabsContainer, TabHeadings, TabHeading } from "./tabs.styles";

const Tabs = ({ children: tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <TabsContainer>
      <TabHeadings>
        {tabs.map((tabs, index) => (
          <TabHeading
            key={index}
            activeTab={index === activeTab}
            onClick={() => changeActiveTab(index)}
          >
            {tabs.props.tabLabel}
          </TabHeading>
        ))}
      </TabHeadings>
      {tabs[activeTab]}
    </TabsContainer>
  );
};

export default Tabs;
