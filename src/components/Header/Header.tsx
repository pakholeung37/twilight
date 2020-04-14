import React from "react";
import { Button } from "antd";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo-wrapper">
        <Logo />
      </div>
      <div className="header__button-group">
        <Button type="link" ghost>
          预览
        </Button>
        <Button type="link" ghost>
          保存
        </Button>
        <Button type="primary">发布</Button>
      </div>
    </div>
  );
}
