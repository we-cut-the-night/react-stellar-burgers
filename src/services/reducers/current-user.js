import { initialUserData } from '../initialData'
import {
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  RESET_PASSWORD_START,
  RESET_PASSWORD_END
} from '../actions'

export const setUserData = (state = initialUserData, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loggedIn: true
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loggedIn: false
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      }
    }
    case RESET_PASSWORD_START: {
      return {
        ...state,
        resetPassword: true
      };
    }
    case RESET_PASSWORD_END: {
      return {
        ...state,
        resetPassword: false
      }
    }
    default: { return state }
  }
}
