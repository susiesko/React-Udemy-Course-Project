import * as actionTypes from '../actions/actions';

const initialState = {
  order: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.PURCHASE_BURGER_START:
      console.log(state);
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action.orderId, action.orderData);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    default: 
      return state;
  }
};

const purchaseBurgerStart = (state) => ({
  ...state,
  loading: true
});

const purchaseBurgerSuccess = (state, orderId, order) => {
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

const purchaseBurgerFail = (state) => ({
  ...state,
  loading: false
})


export default reducer;