import React, { useState } from "react";
import { useSelector } from "react-redux";
import PageButton from "./PageButton";
import { RootState } from "store";
import s from "./page-content.module.scss";

const pageContent: React.FC<{}> = () => {
  const { pages } = useSelector((state: RootState) => ({
    pages: state.app.pages,
  }));
  return (
    <div className={s["content"]}>
      <ul className={s["page-group"]}>
        {pages.map(page => (
          <div className={s["page-button-container"]} key={page.id}>
            <PageButton {...page} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default pageContent;
