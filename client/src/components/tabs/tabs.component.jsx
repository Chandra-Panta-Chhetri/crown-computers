import React, { useState } from "react";
import { TabsContainer, TabHeadings, TabHeading } from "./tabs.styles";

const Tabs = ({ children: tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].props.tabLabel);

  const onTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <TabsContainer>
      <TabHeadings>
        {tabs.map(({ props: { tabLabel } }) => (
          <TabHeading
            key={tabLabel}
            className={`${activeTab === tabLabel ? "active" : ""}`}
            onClick={() => onTabClick(tabLabel)}
          >
            {tabLabel}
          </TabHeading>
        ))}
      </TabHeadings>
      {tabs.map((tab) => {
        if (tab.props.tabLabel !== activeTab) return undefined;
        return tab;
      })}
    </TabsContainer>
  );
};

export default Tabs;
