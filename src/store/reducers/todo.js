import * as actionTypes from "../actions/actionTypes";

const initialState = {
  todoData: [],
  addLoading: false,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state, action);

    case actionTypes.REMOVE_ITEM_SUCCESS:
      return removeItemSuccess(state, action);

    case actionTypes.TODOLIST_START:
      return todoListStart(state, action);

    case actionTypes.TODO_ADD_ITEM_START:
      return todoAddItemStart(state, action);

    case actionTypes.TODOLIST_FAIL:
      return todoListFail(state, action);

    case actionTypes.SET_TODOLIST:
      return setTodoList(state, action);

    case actionTypes.TOGGLE_PROPERTY_SUCCESS:
      return togglePropSuccess(state, action);

    default:
      return state;
  }
};

const todoListStart = (state, action) => {
  return { ...state, loading: true, error: false };
};

const todoAddItemStart = (state, action) => {
  return { ...state, addLoading: true, error: false };
};

const setTodoList = (state, action) => {
  return { ...state, todoData: action.todoData, loading: false, error: false };
};

const todoListFail = (state, action) => {
  return { ...state, loading: false, error: true };
};

const removeItemSuccess = (state, action) => {
  return {
    ...state,
    todoData: state.todoData.filter(todo => todo.id !== action.id),
    loading: false,
    error: false
  };
};

const addItemSuccess = (state, action) => {
  return {
    ...state,
    todoData: state.todoData.concat(action.newItem),
    addLoading: false,
    error: false
  };
};

const togglePropSuccess = (state, action) => {
  const idx = state.todoData.findIndex(el => el.id === action.id);
  const oldItem = state.todoData[idx];
  const newItem = { ...oldItem, [action.prop]: !oldItem[action.prop] };
  return {
    ...state,
    todoData: [
      ...state.todoData.slice(0, idx),
      newItem,
      ...state.todoData.slice(idx + 1)
    ],
    loading: false,
    error: false
  };
};

export default reducer;
