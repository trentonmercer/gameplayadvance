import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Game from  "./screens/Game"

function App() {
  return (
    <Router>
    <Switch>
    <Route path="/game">
      <Game />
    </Route>
    <Route path="/">
      <Game />
    </Route>
  </Switch>
</Router>
  );
}

export default App;
