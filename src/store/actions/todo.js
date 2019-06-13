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

export const todoAddItemStart = () => {
  return {
    type: actionTypes.TODO_ADD_ITEM_START
  };
};

export const todoListFail = error => {
  return {
    type: actionTypes.TODOLIST_FAIL,
    error: error
  };
};
export const setTodoList = todoData => {
  return {
    type: actionTypes.SET_TODOLIST,
    todoData: todoData
  };
};

export const removeItem = (idItem, token) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: idItem,
    token: token
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

export const toggleProperty = (property, id, token) => {
  return {
    type: actionTypes.TOGGLE_PROPERTY,
    property: property,
    id: id,
    token: token
  };
};

export const togglePropertySuccess = (prop, id) => {
  return {
    type: actionTypes.TOGGLE_PROPERTY_SUCCESS,
    prop: prop,
    id: id
  };
};
