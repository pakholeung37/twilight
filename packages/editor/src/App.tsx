import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { Global } from "@emotion/core"
import normalize from "emotion-normalize"
import routes from "./routes"
import theme from "./styles/theme"
import { rootStore, RootStoreProvider } from "./store"

const App: React.FC = function () {
  return (
    <RootStoreProvider value={rootStore}>
      <ChakraProvider theme={theme}>
        <Global styles={normalize} />
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ChakraProvider>
    </RootStoreProvider>
  )
}

export default App
