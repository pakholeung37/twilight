import React from "react";
import styles from "./left-pannel.module.scss";

const Tab: React.FC<{ a?: string }> = ({ children }) => {
  return (
    <div className={styles["tab"]}>
      <ul className={styles["tab-item-group"]}>
        {Array.isArray(children) &&
          children.map((item, index) => (
            <li className={styles["tab-item-container"]} key={index}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tab;
