import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Auth.css";
import * as actions from "../../store/actions";
import { checkValidity } from "../../shared/utility";
import Modal from "../UI/Modal/Modal";
import Loader from "react-loader-spinner";

const Auth = ({ error, loading, isAuthenticated, onAuth, onErrorCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formLogIsValid, setFormLogIsValid] = useState(false);
  const [formRegIsValid, setFormRegIsValid] = useState(false);
  const [authFormLogin, setAuthFormLogin] = useState({
    email: {
      type: "email",
      placeholder: "e-Mail",
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      autoFocus: true
    },

    password: {
      type: "password",
      placeholder: "pass (6+ symbol)",
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [authFormReg, setAuthFormReg] = useState({
    email: {
      type: "email",
      placeholder: "e-Mail",
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      autoFocus: true
    },

    password: {
      type: "password",
      placeholder: "pass (6+ symbol)",
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },

    confirmPassword: {
      type: "password",
      placeholder: "Confirm pass",
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const checkConfirmPassword = (pass, confirmPass) => pass === confirmPass;

  const inputChangedHandler = (event, controlName) => {
    const activeForm = isLogin ? authFormLogin : authFormReg;
    const updateProps = {
      ...activeForm[controlName],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        activeForm[controlName].validation
      ),
      touched: true
    };

    const updateForm = { ...activeForm, [controlName]: updateProps };

    let formIsValid = true;
    let checkRegistration = true;
    if (!isLogin) {
      checkRegistration = checkConfirmPassword(
        updateForm.password.value,
        updateForm.confirmPassword.value
      );
    }

    for (let controlName in updateForm) {
      formIsValid =
        updateForm[controlName].valid && formIsValid && checkRegistration;
    }
    if (isLogin) {
      setAuthFormLogin(updateForm);
      setFormLogIsValid(formIsValid);
    } else {
      setAuthFormReg(updateForm);
      setFormRegIsValid(formIsValid);
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    const activeForm = isLogin ? authFormLogin : authFormReg;
    onAuth(activeForm.email.value, activeForm.password.value, isLogin);
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleRegistration = () => {
    setIsLogin(false);
  };

  const formElementsArray = [];
  const buildsElementsArray = form => {
    for (let key in form) {
      formElementsArray.push({
        id: key, // id: email, id: password ..
        config: form[key]
      });
    }
  };

  isLogin
    ? buildsElementsArray(authFormLogin)
    : buildsElementsArray(authFormReg);

  let form = formElementsArray.map(formElement => (
    <input
      className={
        !formElement.config.valid &&
        formElement.config.validation &&
        formElement.config.touched
          ? "invalid"
          : null
      }
      autoFocus={formElement.config.autoFocus}
      key={formElement.id}
      type={formElement.config.type}
      placeholder={formElement.config.placeholder}
      value={formElement.config.value} // начинался ли ввод в поле
      onChange={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Loader type="Circles" color="#222" height={80} width={80} />;
  }
  let authRedirect = null;
  // после аутентификации переходим на стартовую или на checkout
  if (isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }
  return (
    <>
      <Modal show={error} modalClosed={onErrorCancel} />
      <div className="Auth">
        {authRedirect}
        <form onSubmit={submitHandler}>
          <h4>Enter your login</h4>
          <div className="composition-wrap">
            <div className="inputs-btns-wrap">
              <div className="inputs-wrap">{form}</div>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className={isLogin ? "btn active" : "btn"}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={isLogin ? "btn" : "btn active"}
                  onClick={handleRegistration}
                >
                  Register
                </button>
              </div>
            </div>
            <button
              className="btn submit"
              disabled={isLogin ? !formLogIsValid : !formRegIsValid}
            >
              <span>c</span>
              <span>o</span>
              <span>m</span>
              <span>e</span>
              <span>&nbsp;</span>
              <span>o</span>
              <span>n</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onErrorCancel: () => dispatch(actions.errorCancel())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
