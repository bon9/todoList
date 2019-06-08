import * as actionTypes from "./actionTypes";

export const initTodoList = () => {
  return {
    type: actionTypes.INIT_TODOLIST
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

export const addItem = label => {
  return {
    type: actionTypes.ADD_ITEM,
    label: label
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
