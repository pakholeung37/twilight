import React from "react";
import styles from "./left-pannel.module.scss";
import Tab from "./Tab";
import TabItem, { TabItemProps } from "./TabItem";
import { TabData } from "./LeftPannelContainer";

export interface LeftPannelProps {
  tabsData: TabData[];
  activeItemIndex: number;
  setActiveItem: (index: number) => void;
}

export default function LeftPannel({
  tabsData,
  activeItemIndex,
  setActiveItem,
}: LeftPannelProps) {
  return (
    <div className={styles["left-pannel"]}>
      <div className={styles["tab-container"]}>
        <Tab>
          {tabsData.map((tabData, index) => (
            <TabItem
              active={index === activeItemIndex}
              onClick={() => setActiveItem(index)}
              title={tabData.name}
              key={index}
            >
              {tabData.content}
            </TabItem>
          ))}
        </Tab>
      </div>
      <div className={styles["content-container"]}></div>
    </div>
  );
}
