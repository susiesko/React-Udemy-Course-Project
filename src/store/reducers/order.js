import * as actionTypes from '../actions/actions';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false });
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true, purchased: false });
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action.orderId, action.orderData);
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false });
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {loading: false, orders: action.orders });
    case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false, error: action.error });
    default: return state;
  }
};

const purchaseBurgerSuccess = (state, orderId, order) => {
  const newOrder = updateObject(order, { id: orderId });
  
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
};


export default reducer;