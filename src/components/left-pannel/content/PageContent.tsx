import React, { useState } from "react";
import PageButton from "./PageButton";
import s from "./page-content.module.scss";

const initialState = {
  pages: [
    { id: 0, name: "index" },
    { id: 1, name: "custom 1" },
    { id: 2, name: "custom 2" },
  ],
};
const pageContent: React.FC<{}> = () => {
  const [state, setState] = useState(initialState);

  return (
    <div className={s["content"]}>
      <ul className={s["page-group"]}>
        {state.pages.map(page => (
          <div className={s["page-button-container"]} key={page.id}>
            <PageButton {...page} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default pageContent;
