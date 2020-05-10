import React from "react";
import s from "./application.module.scss";

export interface ApplicationProps {
  id: string | number;
  name: string;
  Icon: React.ReactNode;
  function?: any;
}

const Application: React.FC<ApplicationProps> = ({ name, Icon }) => {
  return (
    <div className={s["application"]} title={name} draggable>
      {Icon}
      <div className={s["name"]}>{name}</div>
    </div>
  );
};

export default Application;
