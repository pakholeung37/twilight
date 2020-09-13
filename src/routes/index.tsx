import React from "react"
import { Route } from "react-router-dom"
import HomePages from "../pages/home/HomeContainer"
import styledComponentsDemo from "../pages/styled-components-demo"
export default [
  <Route
    key="styled-components-demo"
    path="/styled-components-demo"
    component={styledComponentsDemo}></Route>,
  <Route key="home" path="/" component={HomePages}></Route>,
]
