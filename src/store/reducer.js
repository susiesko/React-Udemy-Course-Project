import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  }, 
  totalPrice: 4
}

// i added my own implementation for calculating price with redux during lecture 277.
const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient.name]: state.ingredients[action.ingredient.name] + 1,
        }
      }
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient.name]: state.ingredients[action.ingredient.name] - 1
        }
      }
    default:
      return state;
  }
};

export default reducer;
