import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { Global, css } from "@emotion/core"
import normalize from "emotion-normalize"
import routes from "./routes"
import theme from "./styles/theme"
import { rootStore, RootStoreProvider } from "./store"

const App: React.FC = function () {
  return (
    <RootStoreProvider value={rootStore}>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ChakraProvider>
    </RootStoreProvider>
  )
}

export default App
