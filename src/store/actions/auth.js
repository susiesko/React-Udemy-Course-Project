import * as actionTypes from './actions';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

const authInitiateLogout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignup
});

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return authInitiateLogout();
}

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (!token) {
      dispatch(logout());
    } else if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');

      dispatch(authSuccess(token, userId));
      dispatch( 
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000) // convert back to seconds
      );
    } else {
        dispatch(logout());
    }
  };
}