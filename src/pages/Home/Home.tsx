import React from "react"
import Header from "components/header"
import Content from "./Content"
import LeftPannel from "components/left-pannel"

export default function Home() {
  return (
    <section id="editor">
      <header>
        <Header />
      </header>
      <div className="editor-main">
        <aside className="left-pannel-container">
          <LeftPannel></LeftPannel>
        </aside>
        <Content></Content>
        <aside className="right-pannel-container"></aside>
      </div>
    </section>
  )
}
