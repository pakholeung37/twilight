import React from "react";
import Header from "components/Header";

export default function Home() {
  return (
    <section>
      <header>
        <Header />
      </header>
      <main className="content"></main>
      <aside className="left-pannel-container"></aside>
      <aside className="right-pannel-container"></aside>
      <footer className="footer-container"></footer>
    </section>
  );
}
