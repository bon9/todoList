import { takeEvery, all } from "redux-saga/effects";
import {
  initTodoListSaga,
  removeItemSaga,
  addItemSaga,
  togglePropertySaga
} from "./todo";
import {
  authUserSaga,
  logoutSaga,
  startAuthTimeoutSaga,
  authCheckStateSaga,
  refreshTokenSaga
} from "./auth";

import * as actionTypes from "../actions/actionTypes";

export function* watchTodo() {
  yield all([
    takeEvery(actionTypes.INIT_TODOLIST, initTodoListSaga),
    takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga),
    takeEvery(actionTypes.ADD_ITEM, addItemSaga),
    takeEvery(actionTypes.TOGGLE_PROPERTY, togglePropertySaga)
  ]);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_START_TIMEOUT, startAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.REFRESH_TOKEN, refreshTokenSaga)
  ]);
}
