import { initialBurgerConstructor } from '../initialData';
import { CHANGE_INGREDIENTS } from '../actions/index'

export const changeIngredients = (state = initialBurgerConstructor, action) => {
  switch (action.type) {
    case CHANGE_INGREDIENTS: {
      return { constructor: action.constructor };
    }
    default: { return state; }
  }
};
