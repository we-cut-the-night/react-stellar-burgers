import { combineReducers } from 'redux'
import { getIngredientsAll } from './ingredients';
import { changeIngredients } from './constructor';
import { ingredientDetails } from './ingridient-details'
import { makeOrder } from './order'

export const rootReducer = combineReducers({
  burgerIngredients: getIngredientsAll,
  burgerConstructor: changeIngredients,
  ingredientDetails: ingredientDetails,
  order: makeOrder,
})
