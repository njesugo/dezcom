import React from "react";
import Pay from "./components/Pay";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import Router components
import Success from "./components/Success"; // Import the Success component



const App = () => {

  return (
    <Router >
      <Switch>
        <Route path="/pay">
          <Pay/>
        </Route>
        <Route path="/success">
          <Success/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
