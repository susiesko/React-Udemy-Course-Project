import * as actionTypes from './actions';
import axios from '../../axiosOrders';

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

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json').then(res => {      
      dispatch(setIngredients(res.data));
    }).catch(error => {
      dispatch(fetchIngredientsFailed());
    });
  };
};