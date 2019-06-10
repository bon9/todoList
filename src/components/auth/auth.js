import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Auth.css";
import * as actions from "../../store/actions";
import { checkValidity } from "../../shared/utility";

const Auth = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: {
      type: "email",
      placeholder: "emailишко",
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },

    password: {
      type: "password",
      placeholder: "passwordишку (6+ characters)",
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updateProps = {
      ...authForm[controlName],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        authForm[controlName].validation
      ),
      touched: true
    };
    const updateForm = { ...authForm, [controlName]: updateProps };
    setAuthForm(updateForm);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isLogin);
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleRegistration = () => {
    setIsLogin(false);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key, // id: email, id: password ..
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <input
      className={
        !formElement.config.valid &&
        formElement.config.validation &&
        formElement.config.touched
          ? "invalid"
          : null
      }
      key={formElement.id}
      type={formElement.config.type}
      placeholder={formElement.config.placeholder}
      value={formElement.config.value} // начинался ли ввод в поле
      onChange={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  let authRedirect = null;
  // после аутентификации переходим на стартовую или на checkout
  if (props.isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div className="Auth">
      {authRedirect}
      <form onSubmit={submitHandler}>
        <h4>Enter your login</h4>
        {form}
        <div>
          <button className="btn btn-outline-success" onClick={handleLogin}>
            Login
          </button>
          <button
            className="btn btn-outline-success last"
            onClick={handleRegistration}
          >
            Registration
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
