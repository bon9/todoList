import React from "react";
import Modal from "../components/UI/Modal/Modal";
import useHttpErrorHandler from "../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      // выводим модалку с надписью и
      // возвращаем компонет пришедший в аргументе и все его пропс
      <React.Fragment>
        <Modal show={error} modalClosed={clearError} />
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
