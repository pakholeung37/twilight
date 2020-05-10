import React, { MouseEvent } from "react";
import styles from "./left-pannel.module.scss";

export interface TabItemProps {
  active?: boolean;
  title?: string;
  onClick?: (e: MouseEvent) => void;
}

const TabItem: React.FC<TabItemProps> = ({
  children,
  active = false,
  onClick,
  title,
}) => {
  return (
    <div
      className={[styles["tab-item"], active ? styles["active"] : ""].join(" ")}
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
};

export default TabItem;
