import React from "react";
import s from "./left-pannel.module.scss";
import Tab from "./Tab";
import TabItem from "./TabItem";
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
    <div className={s["left-pannel"]}>
      <div className={s["tab-container"]}>
        <Tab>
          {tabsData.map((tabData, index) => (
            <TabItem
              active={index === activeItemIndex}
              onClick={() => setActiveItem(index)}
              title={tabData.name}
              key={index}
            >
              {tabData.tabContent}
            </TabItem>
          ))}
        </Tab>
      </div>
      <div className={s["contents"]}>
        {tabsData.map((tabData, index) => (
          <div
            className={[
              s["content-container"],
              index === activeItemIndex ? s["active"] : "",
            ].join(" ")}
            key={index}
          >
            {tabData.content}
          </div>
        ))}
      </div>
    </div>
  );
}
