import React from "react";
import { DribbbleSquareOutlined } from "@ant-design/icons";
import s from "./logo.module.scss";
export default function Logo() {
  return (
    <div className={s.logo}>
      <DribbbleSquareOutlined className={s.icon} />
    </div>
  );
}
