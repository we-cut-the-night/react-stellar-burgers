import { combineReducers } from 'redux'
import { getIngredientsAll } from './ingredients';
import { changeIngredients } from './constructor';
import { ingredientDetails } from './ingridient-details'
import { makeOrder } from './order'
import { setUserData } from './current-user'
import { getWSOrders, getWSUserOrders } from './ws-orders';

export const rootReducer = combineReducers({
  burgerIngredients: getIngredientsAll,
  burgerConstructor: changeIngredients,
  ingredientDetails: ingredientDetails,
  order: makeOrder,
  userData: setUserData,
  wsOrders: getWSOrders,
  wsUserOrders: getWSUserOrders,
})
