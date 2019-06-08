import * as actionTypes from "../actions/actionTypes";

const initialState = {
  todoData: []
};

const setTodoList = (state, action) => {
  return { ...state, todoData: action.todoList };
};

const removedItem = (state, action) => {
  return {
    ...state,
    todoData: state.todoData.filter(todo => todo.id !== action.id)
  };
};

const addedItem = (state, action) => {
  return { ...state, todoData: state.todoData.concat(action.newItem) };
};

const toggleProp = (state, action) => {
  const idx = state.todoData.findIndex(el => el.id === action.id);
  const oldItem = state.todoData[idx];
  const newItem = { ...oldItem, [action.prop]: !oldItem[action.prop] };
  return {
    ...state,
    todoData: [
      ...state.todoData.slice(0, idx),
      newItem,
      ...state.todoData.slice(idx + 1)
    ]
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_SUCCESS:
      return addedItem(state, action);

    case actionTypes.REMOVE_ITEM_SUCCESS:
      return removedItem(state, action);

    case actionTypes.SET_TODOLIST:
      return setTodoList(state, action);

    case actionTypes.TOGGLE_PROPERTY_SUCCESS:
      return toggleProp(state, action);

    default:
      return state;
  }
};

export default reducer;
