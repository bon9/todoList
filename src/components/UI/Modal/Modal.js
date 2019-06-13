import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = props => {
  const error = props.show;
  let message = false;
  switch (error) {
    case "EMAIL_NOT_FOUND":
      message = "Email not found. You can create such email";
      break;
    case "INVALID_PASSWORD":
      message = "Invalid password";
      break;
    case "EMAIL_EXISTS":
      message = "Email exists. Try another";
      break;
    case "Network Error":
      message = "Network Error";
      break;
    default:
      message = false;
  }

  if (error.message) {
    message = error.message;
  }

  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="Modal"
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <p>{message}</p>
        <button className="btn" onClick={props.modalClosed}>
          No problem, boss
        </button>
      </div>
    </>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    // условие при которых Modal не обновится
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
