import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Navbar from "./Header/Navbar";
import Header from "./Header/Header";
import Login from "./Login/Login";

const App: React.FC = () => {
  const authToken = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!authToken;
  const [key, setKey] = useState(0); 

  useEffect(() => {
    console.log("Auth Token Updated:", authToken);
    setKey((prevKey) => prevKey + 1);
  }, [authToken]);

  return (
    <Router key={key}>
      <Switch>
        <Route exact path="/" render={() => isAuthenticated ? <Redirect to="/home" /> : <Login />} />
        <Route path="/home" render={() => isAuthenticated ? <Home /> : <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Header />
    </>
  );
};

export default App;
