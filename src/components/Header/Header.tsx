import React from "react";
import { Button } from "antd";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header__logo-wrapper">
          <Logo />
        </div>
      </div>
    </div>
  );
}
