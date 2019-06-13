import * as actionTypes from "./actionTypes";

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIAL_LOGOUT
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const startAuthTimeout = (expiretionTime, refreshToken) => {
  return {
    type: actionTypes.AUTH_START_TIMEOUT,
    expiretionTime: expiretionTime,
    refreshToken: refreshToken
  };
};
export const checkAuthState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

export const errorCancel = () => {
  return {
    type: actionTypes.ERROR_CANCEL
  };
};

export const refreshToken = refreshToken => {
  return {
    type: actionTypes.REFRESH_TOKEN,
    refreshToken: refreshToken
  };
};
