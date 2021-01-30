import * as actionTypes from '../actions/actions';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action.orderId, action.orderData);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action.orders);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default: 
      return state;
  }
};

const purchaseBurgerStart = state => ({
  ...state,
  loading: true,
  purchased: false
});

const purchaseBurgerSuccess = (state, orderId, order) => {
  const newOrder = {
    ...order,
    id: orderId
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  };
};

const purchaseBurgerFail = state => ({
  ...state,
  loading: false
})

const purchaseInit = state => ({
  ...state,
  purchased: false
});

const fetchOrdersStart = state => ({
  ...state,
  loading: true
});

const fetchOrdersSuccess = (state, orders) => ({
  ...state,
  loading: false,
  orders
});

const fetchOrdersFail = state => ({
  ...state,
  loading: false
});

export default reducer;