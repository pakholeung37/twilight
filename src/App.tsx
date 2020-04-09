import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import routes from "./routes";
export default function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </Provider>
  );
}
