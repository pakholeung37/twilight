import React, { useState, ReactNode } from "react";
import LeftPannel from "./LeftPannel";
import PageContent from "./content/PageContent";
import ModuleContent from "./content/ModuleContent";
export interface TabData {
  name: string;
  content?: ReactNode;
  tabContent?: ReactNode;
}

const data: { tabs: TabData[]; activeItemIndex: number } = {
  tabs: [
    { name: "page", tabContent: <div>😁</div>, content: <PageContent /> },
    { name: "module", tabContent: <div>🤑</div>, content: <ModuleContent /> },
    { name: "function", tabContent: <div>🥵</div> },
    { name: "module-pack", tabContent: <div>🥶</div> },
  ],
  activeItemIndex: 0,
};

export default function LeftPannelContainer() {
  const [state, setState] = useState(data);

  const setActiveItem = (index: number) => {
    setState({
      ...state,
      activeItemIndex: index,
    });
  };

  return (
    <LeftPannel
      tabsData={state.tabs}
      activeItemIndex={state.activeItemIndex}
      setActiveItem={setActiveItem}
    ></LeftPannel>
  );
}
