import React from "react"
import s from "./left-pannel.module.scss"

const Tab: React.FC<{ a?: string }> = ({ children }) => {
  return (
    <div className={s["tab"]}>
      <ul className={s["tab-item-group"]}>
        {Array.isArray(children) &&
          children.map((item, index) => (
            <li className={s["tab-item-container"]} key={index}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Tab
