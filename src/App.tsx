import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { Global, css } from "@emotion/core"
import normalize from "emotion-normalize"
import { Provider } from "react-redux"
import store from "./store"
import routes from "./routes"
import { ThemeProvider } from "emotion-theming"
import theme from "styles/theme"

const App: React.FC = function() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>{routes}</Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
