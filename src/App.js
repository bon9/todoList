import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout/Logout";

const App = props => {
  return (
    <>
      <Header isAuth={props.isAuth} />
      <Switch>
        {props.isAuth ? (
          <Route path="/logout" component={Logout} />
        ) : (
          <Route path="/auth" component={Auth} />
        )}
        <Route path="/" exact component={Todo} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(App);
