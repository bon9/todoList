import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios-todo";

export function* initTodoListSaga({ token, userId }) {
  console.log(userId);
  yield put(actions.todoListStart());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  const response = yield axios.get(`/todos.json${queryParams}`);
  const todos = [];
  for (const key in response.data) {
    todos.push({
      done: response.data[key].done,
      id: key,
      important: response.data[key].important,
      label: response.data[key].label
    });
  }
  try {
    yield put(actions.setTodoList(todos));
  } catch (error) {
    yield put(actions.todoListFail(error));
  }
}

export function* removeItemSaga({ id }) {
  yield put(actions.todoListStart());
  yield axios.delete(`todos/${id}.json`);
  try {
    yield put(actions.removeItemSuccess(id));
  } catch (error) {
    yield put(actions.todoListFail(error));
  }
}

export function* addItemSaga({ label, token, userId }) {
  yield put(actions.todoListStart());
  console.log(token);
  console.log(userId);
  const createItem = {
    label: label,
    important: false,
    done: false,
    userId: userId
  };
  let newItem = {};
  yield axios.post(`todos.json?auth=${token}`, createItem).then(res => {
    newItem = { ...createItem, id: res.data.name };
  });
  try {
    yield put(actions.addItemSuccess(newItem));
  } catch (error) {
    yield put(actions.todoListFail(error));
  }
}

export function* togglePropertySaga({ prop, id }) {
  yield put(actions.todoListStart());
  const response = yield axios.get(`/todos/${id}.json`);
  yield axios.patch(`todos/${id}.json`, { [prop]: !response.data[prop] });
  try {
    yield put(actions.togglePropertySuccess(prop, id));
  } catch (error) {
    yield put(actions.todoListFail(error));
  }
}
