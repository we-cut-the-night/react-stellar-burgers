import { initialBurgerConstructor } from '../initialData'
import { ingridientTypes } from '../../utils/constants'
import {
  REMOVE_INGREDIENT,
  ADD_INGREDIENT,
  UPDATE_INGREDIENTS,
  RESET_INGREDIENTS,
} from '../actions/index'
import { v4 as uuidv4 } from 'uuid'
import { TApplicationActions } from 'services/actions/types';
import { IStoreBurgerConstructor } from './types';

export const changeIngredients = (state = initialBurgerConstructor, action: TApplicationActions): IStoreBurgerConstructor => {
  const timeId = uuidv4()

  switch (action.type) {
    case REMOVE_INGREDIENT: {
      return {
        constructor: state.constructor.filter((item)=> item.timeId === action.id ? null : item)
      }
    }
    case ADD_INGREDIENT: {
      const typeBun = ingridientTypes[0].type
      if(action.item.type === typeBun) {
        return {
          constructor: [
            ...state.constructor.filter((item) => item.type === typeBun ? null : item), { ...action.item, timeId }
          ]
        }
      } else {
        return {constructor: [...state.constructor, { ...action.item, timeId }]}
      }
    }
    case UPDATE_INGREDIENTS: {
      return { constructor: action.constructor }
    }
    case RESET_INGREDIENTS: {
      return { constructor: [] }
    }
    default: { return state; }
  }
};
