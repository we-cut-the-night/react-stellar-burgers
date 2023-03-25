import { combineReducers } from 'redux'
import { getIngredientsAll } from './ingredients';
import { changeIngredients } from './constructor';

export const rootReducer = combineReducers({
  burgerIngredients: getIngredientsAll,
  burgerConstructor: changeIngredients,
})
