import React from "react"
import Logo from "./Logo"
import s from "./header.module.scss"

export default function Header() {
  return (
    <div className={s.header}>
      <div className={s["logo-wrapper"]}>
        <Logo />
      </div>
      <div className={s["button-group"]}></div>
    </div>
  )
}
