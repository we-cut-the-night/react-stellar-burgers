import { initialOrder } from '../initialData'
import {
  ORDER_CLOSE, ORDER_FAIL, ORDER_SUCCESS, ORDER_REQUEST, OPEN_ORDER_DETAILS
} from '../actions'
import { TApplicationActions } from 'services/actions/types';

export const makeOrder = (state = initialOrder, action: TApplicationActions) => {
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
        order: initialOrder.order,
        orderRequest: false,
        orderFail: false,
        isOpen: false
      };
    }
    case OPEN_ORDER_DETAILS: {
      return {
        ...state,
        isOpen: true
      };
    }
    default: { return state }
  }
}
