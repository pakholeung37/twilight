import React from "react";
import { Button } from "antd";
import {
  EyeOutlined,
  SaveOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import s from "./header.module.scss";

export default function Header() {
  return (
    <div className={s.header}>
      <div className={s["logo-wrapper"]}>
        <Logo />
      </div>
      <div className={s["button-group"]}>
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
