import * as actionTypes from '../actions/actions';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null, 
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


// i added my own implementation for calculating price with redux during lecture 277.
const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action.ingredientName);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action.ingredientName);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action.ingredients);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
}

const setIngredients = (state, ingredients) => {
  return {
    ...state,
    error: false,
    totalPrice: 4,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    },
    building: false
  }
}

const addIngredient = (state, ingredientName) => {
  const updatedIngredient = { [ ingredientName ]: state.ingredients[ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);  
  
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
    building: true
  });
}

const removeIngredient = (state, ingredientName) => {
  const updatedIngredient = { [ ingredientName ]: state.ingredients[ingredientName] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
  });
}

const fetchIngredientsFailed = state => updateObject( state, { error: true });

export default reducer;
