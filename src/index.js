import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchTodo } from "./store/sagas/index";

import App from "./App";
import todoReducer from "./store/reducers/todo";
import authReducer from "./store/reducers/auth";

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  todo: todoReducer,
  auth: authReducer
});
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchTodo);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
