import React, { useState } from "react";

import "./Auth.css";

const Auth = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: {
      type: "email",
      placeholder: "emailишко",
      value: ""
    },

    password: {
      type: "password",
      placeholder: "passwordишку",
      value: ""
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updateProps = { ...authForm[controlName], value: event.target.value };
    const updateForm = { ...authForm, [controlName]: updateProps };
    setAuthForm(updateForm);
  };

  const submitHandler = event => {
    event.preventDefault();
    alert("asd");
  };

  const handleLogin = () => {
    setIsLogin(true);
    setIsReg(false);
  };

  const handleReg = () => {
    setIsReg(true);
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
      key={formElement.id}
      type={formElement.config.type}
      placeholder={formElement.config.placeholder}
      value={formElement.config.value}
      onChange={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  return (
    <div className="Auth">
      <form onSubmit={submitHandler}>
        <h4>Enter your login</h4>
        {form}
        <div>
          <button className="btn btn-outline-success" onClick={handleLogin}>
            Login
          </button>
          <button className="btn btn-outline-success last" onClick={handleReg}>
            Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
