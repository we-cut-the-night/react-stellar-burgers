import { getIngridientsData } from '../utils/api'
import {
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  INGREDIENTS_ALL_FAIL,
} from './actions/index'

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({ type: INGREDIENTS_ALL_REQUEST })

    getIngridientsData()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_ALL_SUCCESS,
            ingredientsData: res.data
          });
        } else {
          dispatch({ type: INGREDIENTS_ALL_FAIL })
        }
      })
      .catch(err => {
        dispatch({ type: INGREDIENTS_ALL_FAIL })
        console.log('Ошибка: ', err)
      })
  }
}
