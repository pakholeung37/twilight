import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import routes from "./routes"
import theme from "./styles/theme"
import { rootStore, RootStoreProvider } from "./store"
import "./styles/tailwind-base.css"

const App: React.FC = function () {
  return (
    <RootStoreProvider value={rootStore}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ChakraProvider>
    </RootStoreProvider>
  )
}

export default App
