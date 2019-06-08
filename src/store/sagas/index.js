import { takeEvery } from "redux-saga/effects";
import {
  initTodoListSaga,
  removeItemSaga,
  addItemSaga,
  togglePropertySaga
} from "./todo";

import * as actionTypes from "../actions/actionTypes";

export function* watchTodo() {
  yield takeEvery(actionTypes.INIT_TODOLIST, initTodoListSaga);
  yield takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga);
  yield takeEvery(actionTypes.ADD_ITEM, addItemSaga);
  yield takeEvery(actionTypes.TOGGLE_PROPERTY, togglePropertySaga);
}
