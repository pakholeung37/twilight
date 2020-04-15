import React from "react";
import Header from "components/Header";
import Content from "./Content";

export default function Home() {
  return (
    <section id="editor">
      <header>
        <Header />
      </header>
      <div className="editor-main">
        <aside className="left-pannel-container"></aside>
        <Content></Content>
        <aside className="right-pannel-container"></aside>
      </div>
    </section>
  );
}
