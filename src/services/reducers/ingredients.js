import { initialBurgerIngredients } from '../initialData';
import {
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  INGREDIENTS_ALL_FAIL,
  SET_INGRIDIENT_TAB,
} from '../actions/index'

export const getIngredientsAll = (state = initialBurgerIngredients, action) => {
  switch (action.type) {
    case INGREDIENTS_ALL_REQUEST: {
      return {
        ...state,
        ingredientsAllRequest: true
      };
    }
    case INGREDIENTS_ALL_SUCCESS: {
      return {
        ...state,
        ingredientsAll: action.ingredientsData,
        ingredientsAllRequest: false,
        ingredientsAllFail: false
      };
    }
    case INGREDIENTS_ALL_FAIL: {
      return {
        ...state,
        ingredientsAllRequest: false,
        ingredientsAllFail: true
      };
    }
    case SET_INGRIDIENT_TAB: {
      return {
        ...state,
        currentIngredientTab: action.currentIngredientTab
      };
    }
    default: { return state }
  }
}
