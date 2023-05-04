import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Landing from "./Screens/Landing";
import Table from "./Screens/Table";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main">
          <Landing />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
        <Redirect to="/main" />
      </Switch>
    </Router>
  );
}

export default App;
