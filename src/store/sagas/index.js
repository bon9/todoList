import { takeEvery, all } from "redux-saga/effects";
import {
  initTodoListSaga,
  removeItemSaga,
  addItemSaga,
  togglePropertySaga
} from "./todo";
import { authUserSaga, logoutSaga } from "./auth";

import * as actionTypes from "../actions/actionTypes";

export function* watchTodo() {
  yield takeEvery(actionTypes.INIT_TODOLIST, initTodoListSaga);
  yield takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga);
  yield takeEvery(actionTypes.ADD_ITEM, addItemSaga);
  yield takeEvery(actionTypes.TOGGLE_PROPERTY, togglePropertySaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logoutSaga);
}
