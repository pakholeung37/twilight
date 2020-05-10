import React from "react";
import DawnBreak from "dawnbreak";
import s from "./preview.module.scss";

export default class Preview extends React.Component {
  componentDidMount() {
    const appRoot = document.getElementById("preview-app");
    if (appRoot) {
      DawnBreak(appRoot);
    } else {
      console.log("dawn break mounted failed");
    }
  }
  render() {
    return <div id="preview-app" className={s.preview}></div>;
  }
}

// export default function Preivew() {
//   return <div></div>;
// }
