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

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    const APIKey = process.env.REACT_APP_API_KEY;
    console.log('APIKey', APIKey);

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`;

    if (!isSignup){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`;
    }

    axios.post(url, authData)
      .then(res => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      }).catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  }
};

export const logout = () => {
  return authLogout();
}