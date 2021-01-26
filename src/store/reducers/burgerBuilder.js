import * as actionTypes from '../actions/actions';

const initialState = {
  ingredients: null, 
  totalPrice: 4,
  error: false
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
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action.ingredientName);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action.ingredientName);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action.ingredients);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

const fetchIngredientsFailed = (state) => ({  
  ...state,
  error: true
});

const setIngredients = (state, ingredients) => ({
  ...state,
  error: false,
  ingredients: ingredients
});

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
