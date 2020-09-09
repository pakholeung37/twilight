import React from "react"
import { useSelector } from "react-redux"
import Application from "./Application"
import s from "./module-content.module.scss"
import { RootState } from "store"

const nameIconMap: { [key: string]: JSX.Element } = {
  Swiper: <div>🖼</div>,
  ["Article List"]: <div>📙</div>,
  container: <div>🛒</div>,
  Video: <div>🎞</div>,
  Map: <div>🏰</div>,
  Audio: <div>📀</div>,
  Photo: <div>📽</div>,
  Form: <div>📰</div>,
  DownLoad: <div>🗑</div>,
}

const getIcon = (name: string) => {
  return nameIconMap[name] || <div></div>
}

const ModuleContent: React.FC<{}> = () => {
  const { applications } = useSelector((state: RootState) => ({
    applications: state.modules.applications,
  }))
  return (
    <div className={s["content"]}>
      <ul className={s["application-group"]}>
        {applications.map(app => (
          <div className={s["application-container"]} key={app.id}>
            <Application {...app} Icon={getIcon(app.name)} />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ModuleContent
