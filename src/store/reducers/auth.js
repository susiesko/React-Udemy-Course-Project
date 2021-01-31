import * as actionTypes from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state  = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    default:
      return state;
  }
}

const authStart = state => {
  return updateObject(state, {loading: true, error: null});
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {loading: true, error: action.error});
}

export default reducer;