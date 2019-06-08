import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios-todo";

export function* initTodoListSaga() {
  const response = yield axios.get("/todos.json");
  const resTodoData = response.data;
  const todos = [];
  for (const key in resTodoData) {
    todos.push({
      done: resTodoData[key].done,
      id: key,
      important: resTodoData[key].important,
      label: resTodoData[key].label
    });
  }
  try {
    yield put(actions.setTodoList(todos));
  } catch (error) {
    yield put(console.log("[initTodoListSaga]", error));
  }
}

export function* removeItemSaga({ id }) {
  yield axios.delete(`todos/${id}.json`);
  try {
    yield put(actions.removeItemSuccess(id));
  } catch (error) {
    yield put(console.log("[removeItemSaga]", error));
  }
}

export function* addItemSaga({ label }) {
  const createItem = {
    label: label,
    important: false,
    done: false
  };
  let newItem = {};
  yield axios.post("todos.json", createItem).then(res => {
    newItem = { ...createItem, id: res.data.name };
  });
  try {
    yield put(actions.addItemSuccess(newItem));
  } catch (error) {
    yield put(console.log("[addItemSaga]", error));
  }
}

export function* togglePropertySaga({ prop, id }) {
  const response = yield axios.get(`/todos/${id}.json`);
  yield axios.patch(`todos/${id}.json`, { [prop]: !response.data[prop] });
  try {
    yield put(actions.togglePropertySuccess(prop, id));
  } catch (error) {
    yield put(console.log("[togglePropertySaga]", error));
  }
}
