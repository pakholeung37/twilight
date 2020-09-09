import React from "react"
import s from "./page-button.module.scss"
export interface PageButtonProps {
  name: string
}
const PageButton: React.FC<PageButtonProps> = ({ name }) => {
  return <div className={s["page-button"]}>{name}</div>
}

export default PageButton
