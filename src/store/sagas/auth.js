import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

export function* authUserSaga({ email, password, isSignup }) {
  yield put(actions.authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  const apiKey = "AIzaSyAErot8PMDJM2RAYZipO0ODxDAK8bjII3k";
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
  if (isSignup) {
    // если зареган то URL для проверки пароля
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
  }
  try {
    const response = yield axios.post(url, authData);
    console.log(response);
    // отправляем в Storage token и время до которого он будет действовать
    // expiresIn - кол-во секунд, которое будет действовать token пришедший
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield call([localStorage, "setItem"], "token", response.data.idToken);
    yield call([localStorage, "setItem"], "expirationDate", expirationDate);
    yield call([localStorage, "setItem"], "userId", response.data.localId);
    console.log("[authUserSaga]", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSuccess());
}
