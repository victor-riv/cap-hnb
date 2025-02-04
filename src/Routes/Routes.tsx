import React from "react";
import App from "../components/App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={App} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;
