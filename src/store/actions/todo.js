import * as actionTypes from "./actionTypes";

export const initTodoList = (token, userId) => {
  return {
    type: actionTypes.INIT_TODOLIST,
    token: token,
    userId: userId
  };
};

export const todoListStart = () => {
  return {
    type: actionTypes.TODOLIST_START
  };
};
export const todoListFail = error => {
  return {
    type: actionTypes.TODOLIST_FAIL,
    error: error
  };
};
export const setTodoList = todoList => {
  return {
    type: actionTypes.SET_TODOLIST,
    todoList: todoList
  };
};

export const removeItem = idItem => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: idItem
  };
};

export const removeItemSuccess = removedId => {
  return {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    id: removedId
  };
};

export const addItem = (label, token, userId) => {
  return {
    type: actionTypes.ADD_ITEM,
    label: label,
    token: token,
    userId: userId
  };
};

export const addItemSuccess = newItem => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    newItem: newItem
  };
};

export const toggleProperty = (prop, id) => {
  return {
    type: actionTypes.TOGGLE_PROPERTY,
    prop: prop,
    id: id
  };
};

export const togglePropertySuccess = (prop, id) => {
  return {
    type: actionTypes.TOGGLE_PROPERTY_SUCCESS,
    prop: prop,
    id: id
  };
};
