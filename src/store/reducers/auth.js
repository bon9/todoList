import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: false,
  userId: false,
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: false, loading: true };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: false,
        loading: false
      };

    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.error, loading: false };

    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: false, userId: false };

    case actionTypes.ERROR_CANCEL:
      return { ...state, error: false };

    default:
      return state;
  }
};

export default reducer;
