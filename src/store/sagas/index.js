import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions';
import { logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}