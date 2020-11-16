import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import routes from "./routes"
import theme from "styles/theme"
import { RecoilRoot } from "recoil"

const App: React.FC = function () {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
