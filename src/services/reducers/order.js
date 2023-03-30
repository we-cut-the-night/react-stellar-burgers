import { initialOrder } from '../initialData'
import {
  ORDER_CLOSE, ORDER_FAIL, ORDER_SUCCESS, ORDER_REQUEST
} from '../actions'

export const makeOrder = (state = initialOrder, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFail: false,
        isOpen: true
      };
    }
    case ORDER_FAIL: {
      return {
        ...state,
        orderRequest: false,
        orderFail: true
      };
    }
    case ORDER_CLOSE: {
      return {
        order: {},
        orderRequest: false,
        orderFail: false,
        isOpen: false
      };
    }
    default: { return state }
  }
}
