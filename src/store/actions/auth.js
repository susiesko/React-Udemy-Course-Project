import * as actionTypes from './actions';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ6_pcXO2_N-l8V-qZy9Odpia6Qiz6IUU';

    if (!isSignup){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ6_pcXO2_N-l8V-qZy9Odpia6Qiz6IUU';
    }

    axios.post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      }).catch(err => {
        console.error(err);
        dispatch(authFail(err));
      });
  }
};