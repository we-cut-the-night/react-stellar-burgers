import { AppDispatch, AppThunkAction, TIngredientList } from 'utils/types'
import { getIngridientsData, postOrder } from '../utils/api'
import {
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  INGREDIENTS_ALL_FAIL,
  ORDER_SUCCESS,
  RESET_INGREDIENTS,
  ORDER_FAIL,
} from './actions/index'

export const getIngredients = (): AppThunkAction => {
  return function (dispatch: AppDispatch) {
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

export const handleOrder = (data: { ingredients: TIngredientList }): AppThunkAction => {
  return function(dispatch) {
    postOrder(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCESS,
            order: res.order
          })
          dispatch({
            type: RESET_INGREDIENTS,
          })
        } else {
          dispatch({ type: ORDER_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: ORDER_FAIL })
        console.log('Ошибка: ', err)
      })
  }
}
