import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";
import "./App.css";
import Auth from "./components/Auth/Auth";

export default function App(props) {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Todo} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}
