import {initialIngredientDetails} from '../initialData'
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from '../actions'


export const ingredientDetails = (state = initialIngredientDetails, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: action.ingredientDetails,
        isOpen: true
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: {},
        isOpen: false
      };
    }
    default: { return state }
  }
}
