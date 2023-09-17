import { ORDER_CLOSE, ORDER_FAIL, ORDER_SUCCESS, ORDER_REQUEST, OPEN_ORDER_DETAILS } from "services/actions"
import { makeOrder } from "./order";

const initialState = {
  order: {
    id: '',
    number: 0
  },
  orderRequest: false,
  orderFail: false,
  isOpen: false
}

const mockOrderData = {
  number: 6167
}

describe("testing order reducer", () => {
  it('should return initial state with orderRequest is true and isOpen is true', () => {
    const action = {
      type: ORDER_REQUEST,
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      isOpen: true,
    });
    expect(state.orderRequest).toBe(true);
    expect(state.isOpen).toBe(true);
  });
  it('should return initial state with mockOrderData', () => {
    const action = {
      type: ORDER_SUCCESS,
      order: mockOrderData,
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: mockOrderData,
      orderRequest: false,
      orderFail: false,
      isOpen: true
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderFail).toBe(false);
    expect(state.isOpen).toBe(true);
  });
  it('should return initial state with orderRequest is false and orderFail is true', () => {
    const action = {
      type: ORDER_FAIL,
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderFail: true,
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderFail).toBe(true);
  });
  it('should return initial state with false flags', () => {
    const action = {
      type: ORDER_CLOSE,
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderFail).toBe(false);
    expect(state.isOpen).toBe(false);
  });
  it('should return initial state with isOpen is true', () => {
    const action = {
      type: OPEN_ORDER_DETAILS,
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOpen: true,
    });
    expect(state.isOpen).toBe(true);
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = makeOrder(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
