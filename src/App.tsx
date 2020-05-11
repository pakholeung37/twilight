import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./routes";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </Provider>
  );
}
