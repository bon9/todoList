import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";
import "./App.css";
import * as actions from "./store/actions";

const Logout = lazy(() => import("./components/Auth/Logout/Logout"));
const Auth = lazy(() => import("./components/Auth/Auth"));

const App = ({ isAuth, onTryAutoSignup }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <>
      <Header isAuth={isAuth} />
      <Suspense
        fallback={
          <div className="app-loader">
            <Loader type="Circles" color="#222" height={80} width={80} />
          </div>
        }
      >
        <Switch>
          {isAuth ? (
            <Route path="/logout" component={Logout} />
          ) : (
            <Route path="/auth" component={Auth} />
          )}
          <Route path="/" exact component={Todo} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
