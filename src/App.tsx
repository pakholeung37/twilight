import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { Global, css } from "@emotion/core"
import normalize from "emotion-normalize"
import routes from "./routes"
import { ThemeProvider } from "emotion-theming"
import theme from "styles/theme"
import { RecoilRoot } from "recoil"
const App: React.FC = function () {
  return (
    <RecoilRoot>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
