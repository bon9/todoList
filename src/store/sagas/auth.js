import { put, call, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "refreshToken");
  yield put(actions.logoutSuccess());
}

export function* refreshTokenSaga({ refreshToken }) {
  let urlToken = `https://securetoken.googleapis.com/v1/token?key=AIzaSyAErot8PMDJM2RAYZipO0ODxDAK8bjII3k`;
  // проверяем, залогинены ли мы сейчас, если да, то обновляем токен, получаем новый refresh, id token, и expireTime
  // обновляем expireTime в локалке, id_token в локалке и состоянии и запускаем таймер с новым expireTime
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    try {
      const tokenResponse = yield axios.post(
        urlToken,
        `grant_type=refresh_token&refresh_token=${refreshToken}`
      );

      const expires_in = yield new Date(
        new Date().getTime() + tokenResponse.data.expires_in * 1000
      );

      yield call([localStorage, "setItem"], "expirationDate", expires_in);
      yield call(
        [localStorage, "setItem"],
        "token",
        tokenResponse.data.id_token
      );
      yield put(
        actions.authSuccess(
          tokenResponse.data.id_token,
          tokenResponse.data.user_id
        )
      );
      yield put(
        actions.startAuthTimeout(
          tokenResponse.data.expires_in,
          tokenResponse.data.refresh_token
        )
      );
    } catch (error) {
      console.log(error);
      yield put(actions.authFail(error.response.data.error.message));
    }
  }
}

export function* startAuthTimeoutSaga({ expiretionTime, refreshToken }) {
  // запускаем задержку, после которой необходимо обновить refreshToken
  yield delay(expiretionTime * 1000);
  yield put(actions.refreshToken(refreshToken));
}

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
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
  }
  try {
    const response = yield axios.post(url, authData);
    // отправляем в Storage token время до которого он будет действовать
    // expiresIn - кол-во секунд, которое будет действовать token пришедший
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield call([localStorage, "setItem"], "token", response.data.idToken);
    yield call([localStorage, "setItem"], "expirationDate", expirationDate);
    yield call([localStorage, "setItem"], "userId", response.data.localId);
    yield call(
      [localStorage, "setItem"],
      "refreshToken",
      response.data.refreshToken
    );
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    // залогинились и вызвали таймер для обновления refreshToken
    yield put(
      actions.startAuthTimeout(
        response.data.expiresIn,
        response.data.refreshToken
      )
    );
  } catch (error) {
    yield put(actions.authFail(error.response.data.error.message));
  }
}

export function* authCheckStateSaga() {
  //при ините проверяем был ли зареган, если да то проверяем не прошло ли время
  // если прошло, обновляем токен, если не прошло, устанавливаем в состояние токе и айди с локалки
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    const refreshToken = localStorage.getItem("refreshToken");
    // expirationDate - время, в которое истечет ключ
    // new Date() - настоящее
    // если время в которое истечет ключ МЕНЬШЕ (т.е. уже прошло) чем сейчас, то логаут
    if (expirationDate <= new Date()) {
      yield put(actions.refreshToken(refreshToken));
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.startAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000,
          refreshToken
        )
      );
    }
  }
}
