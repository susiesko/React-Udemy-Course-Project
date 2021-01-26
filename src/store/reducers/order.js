import * as actionTypes from '../actions/actionTypes';

const initialState = {
  order: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(action.orderId, action.orderData);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail();
    default: 
      return state;
  }
};

const purchaseBurgerSuccess = (orderId, order) => {
  const newOrder = {
    ...order,
    id: orderId
  };
  return {
    ...state,
    loading: false,
    order: state.orders.concat(newOrder)
  } ;
};

const purchaseBurgerFail = () => ({
  ...state,
  loading: false
})


export default reducer;