import React from "react";
import { Button } from "antd";
import {
  EyeOutlined,
  SaveOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles["logo-wrapper"]}>
        <Logo />
      </div>
      <div className={styles["button-group"]}>
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
