import React, { useState, ReactNode } from "react";
import LeftPannel from "./LeftPannel";

export interface TabData {
  name: string;
  content?: ReactNode;
}

const data: { tabs: TabData[]; activeItemIndex: number } = {
  tabs: [
    { name: "page", content: <div>😁</div> },
    { name: "module", content: <div>🤑</div> },
    { name: "function", content: <div>🥵</div> },
    { name: "module-pack", content: <div>🥶</div> },
  ],
  activeItemIndex: -1,
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
