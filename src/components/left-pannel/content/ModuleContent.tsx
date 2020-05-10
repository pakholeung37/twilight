import React, { useState } from "react";
import Application from "./Application";
import s from "./module-content.module.scss";

const initialState = {
  applications: [
    { id: 0, name: "Swiper", Icon: <div>🖼</div> },
    { id: 1, name: "Article List", Icon: <div>📙</div> },
    { id: 2, name: "container", Icon: <div>🛒</div> },
    { id: 3, name: "Video", Icon: <div>🎞</div> },
    { id: 4, name: "Map", Icon: <div>🏰</div> },
    { id: 5, name: "Audio", Icon: <div>📀</div> },
    { id: 6, name: "Photo", Icon: <div>📽</div> },
    { id: 7, name: "Form", Icon: <div>📰</div> },
    { id: 8, name: "DownLoad", Icon: <div>🗑</div> },
  ],
};
const moduleContent: React.FC<{}> = () => {
  const [state, setState] = useState(initialState);

  return (
    <div className={s["content"]}>
      <ul className={s["application-group"]}>
        {state.applications.map(app => (
          <div className={s["application-container"]} key={app.id}>
            <Application {...app} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default moduleContent;
