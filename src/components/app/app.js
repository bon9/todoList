import React from "react";

import TodoPage from "../todo-page";
import Header from "../header";
import "./app.css";

export default function App(props) {
  return (
    <>
      <Header />
      <TodoPage />
    </>
  );
}
