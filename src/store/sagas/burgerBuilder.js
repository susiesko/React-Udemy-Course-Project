import { put } from 'redux-saga/effects'
import axios from '../../axiosOrders';

import * as actions from '../actions/';

export function* initIngredientsSaga (action){
  try{
    const res = yield axios.get('/ingredients.json');
    yield put(actions.setIngredients(res.data));
  } catch (ex){
    yield put(actions.fetchIngredientsFailed(ex));
  }
}