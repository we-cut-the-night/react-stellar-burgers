import { getIngridientsData, postOrder } from '../utils/api'
import {
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  INGREDIENTS_ALL_FAIL,
  ORDER_SUCCESS,
  CHANGE_INGREDIENTS,
  ORDER_FAIL,
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

export const handleOrder = (data) => {
  return function(dispatch) {
    postOrder(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCESS,
            order: res.order
          });
          dispatch({
            type: CHANGE_INGREDIENTS,
            constructor: []
          });
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
