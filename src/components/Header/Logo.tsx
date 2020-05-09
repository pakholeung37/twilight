import React from "react";
import { DribbbleSquareOutlined } from "@ant-design/icons";
import styles from "./logo.module.scss";
export default function Logo() {
  return (
    <div className={styles.logo}>
      <DribbbleSquareOutlined className={styles.icon} />
    </div>
  );
}
