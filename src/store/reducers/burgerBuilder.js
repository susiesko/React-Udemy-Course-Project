import * as actionTypes from '../actions/actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  }, 
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


// i added my own implementation for calculating price with redux during lecture 277.
const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action.ingredientName);
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredient.name]: state.ingredients[action.ingredient.name] + 1,
      //     totalPrice: state.totalPrice + action.ingredient.price
      //   }
      // }
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action.ingredientName);
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredient.name]: state.ingredients[action.ingredient.name] - 1,
      //     totalPrice: state.totalPrice - action.ingredient.price
      //   }
      // }
    default:
      return state;
  }
};

const addIngredient = (state, ingredientName) => {
  //console.log('addIngredient', state, ingredientName);
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
  }  
}

const removeIngredient = (state, ingredientName) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
  }  
}

export default reducer;
