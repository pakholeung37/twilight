import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { Normalize } from "styled-normalize"
import { Provider } from "react-redux"
import store from "./store"
import routes from "./routes"

const App: React.FC = function() {
  return (
    <>
      <Normalize></Normalize>
      <Provider store={store}>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App
