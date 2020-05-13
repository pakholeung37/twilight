import React from "react";
import ArticleList from "components/modules/ArticleList";
import s from "./preview.module.scss";

export default function Preivew() {
  const props = [
    {
      title: "How can I alias a default import in Javascript?",
      summary:
        "The alias on its own is esoteric! Importing the named export and the default is handy when testing redux components.",
      cover: {
        src: `https://picsum.photos/${~~(600 * Math.random() + 200)}/${~~(
          600 * Math.random() +
          200
        )}`,
        alt: "dog",
      },
    },
  ];
  return (
    <div id="preview-app" className={s.preview}>
      <ArticleList articles={props}></ArticleList>
    </div>
  );
}
