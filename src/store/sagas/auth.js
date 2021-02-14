import { delay, put } from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const APIKey = process.env.REACT_APP_API_KEY;

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`;

  if (!action.isSignup){
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`;
  }

  try {
    const res = yield axios.post(url, authData);
  
    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  }
  catch (err){
    yield put(actions.authFail(err.response.data.error));
  }
}