import React from "react";
import { Button } from "antd";
import {
  EyeOutlined,
  SaveOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo-wrapper">
        <Logo />
      </div>
      <div className="header__button-group">
        <Button type="link" icon={<EyeOutlined />}>
          预览
        </Button>
        <Button type="link" icon={<SaveOutlined />}>
          保存
        </Button>
        <Button type="primary" icon={<CloudUploadOutlined />}>
          发布
        </Button>
      </div>
    </div>
  );
}
