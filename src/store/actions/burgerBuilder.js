import * as actionTypes from './actions';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = (error) => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS
});