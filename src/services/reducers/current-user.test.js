import {
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  RESET_PASSWORD_START,
  RESET_PASSWORD_END
} from "services/actions"
import { setUserData } from "./current-user";

const initialState = {
  loggedIn: false,
  email: "",
  name: "",
  resetPassword: false,
}

const mockUserData = {
  email: 'ivanthecreator@gmail.com',
  name: 'Иван Иванович',
}

describe("testing userData reducer", () => {
  it('should return initial state with loggedIn is true', () => {
    const action = {
      type: LOGIN,
    };
    const state = setUserData(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loggedIn: true,
    });
  });
  it('should return initial state with loggedIn is false', () => {
    const loggedInUserData = {
      ...mockUserData,
      loggedIn: true,
      resetPassword: false,
    }
    const action = {
      type: LOGOUT,
    };
    const state = setUserData(loggedInUserData, action);
    expect(state).toEqual({
      ...loggedInUserData,
      loggedIn: false,
    });
  });
  it('should return initial state with mock user data', () => {

    const action = {
      type: SET_USER_DATA,
      data: mockUserData,
    };
    const state = setUserData(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ...mockUserData,
    });
  });
  it('should return initial state with resetPassword is true', () => {
    const action = {
      type: RESET_PASSWORD_START,
    };
    const state = setUserData(initialState, action);
    expect(state).toEqual({
      ...initialState,
      resetPassword: true,
    });
  });
  it('should return initial state with resetPassword is false', () => {
    const action = {
      type: RESET_PASSWORD_END,
    };
    const state = setUserData({ ...initialState, resetPassword: true }, action);
    expect(state).toEqual({
      ...initialState,
      resetPassword: false,
    });
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = setUserData(initialState, action);
    expect(state).toEqual(initialState);
  });
});
