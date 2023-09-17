import { initialWSOrders as initialState } from "services/initialData";
import { getWSOrders, getWSUserOrders } from "./ws-orders";
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "services/actions/ws-actions";

const mockPayloadData = {
  isTrusted: true
}

const mockOrdersData = {
"success": true,
"orders": [
  {
    "_id":"6506c9106d2997001caa93e8",
  "ingredients":["643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],
  "status":"done",
  "name":"Space флюоресцентный бургер",
  "createdAt":"2023-09-17T09:38:24.015Z",
  "updatedAt":"2023-09-17T09:38:24.218Z",
  "number":20879
},
  {
  "_id":"6506c1446d2997001caa93dc",
  "ingredients":["643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093d"],
  "status":"done",
  "name":"Space флюоресцентный бургер",
  "createdAt":"2023-09-17T09:05:08.318Z",
  "updatedAt":"2023-09-17T09:05:08.560Z",
  "number":20878
},
  ],
  "total":2,
  "totalToday": 2
}

describe("testing wsOrders reducer", () => {
  it('should return initial state with connected is true', () => {
    const action = {
      type: WS_CONNECTION_START,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: true,
    });
    expect(state.connected).toBe(true);
  });
  it('should return initial state with mockPayloadData and connected is true', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
      payload: mockPayloadData,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: true,
      info: mockPayloadData,
    });
    expect(state.connected).toBe(true);
  });
  it('should return initial state with mockPayloadData and connected is false', () => {
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: mockPayloadData,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: false,
      error: mockPayloadData,
    });
    expect(state.connected).toBe(false);
  });
  it('should return state with mockPayloadData and connected is false', () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
      payload: mockPayloadData,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: false,
      info: mockPayloadData,
    });
    expect(state.connected).toBe(false);
  });
  it('should return state with mockOrdersData', () => {
    const action = {
      type: WS_GET_MESSAGE,
      payload: mockOrdersData,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockOrdersData,
    });
  });
  it('should return initial state with error is null', () => {
    const action = {
      type: WS_CONNECTION_STOP,
      payload: mockOrdersData,
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: null,
    });
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = getWSOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
  it('should return state with connected is true', () => {
    const action = {
      type: WS_AUTH_CONNECTION_START,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: true,
    });
  });
  it('should return state with connected is true and mockPayloadData', () => {
    const action = {
      type: WS_AUTH_CONNECTION_SUCCESS,
      payload: mockPayloadData,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: true,
      info: mockPayloadData,
    });
    expect(state.connected).toBe(true);
  });
  it('should return state with connected is false and mockPayloadData', () => {
    const action = {
      type: WS_AUTH_CONNECTION_ERROR,
      payload: mockPayloadData,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: false,
      error: mockPayloadData,
    });
    expect(state.connected).toBe(false);
  });
  it('should return state with connected is false and info is mockPayloadData', () => {
    const action = {
      type: WS_AUTH_CONNECTION_CLOSED,
      payload: mockPayloadData,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connected: false,
      info: mockPayloadData,
    });
    expect(state.connected).toBe(false);
  });
  it('should return state with connected is false and data is mockOrdersData', () => {
    const action = {
      type: WS_AUTH_GET_MESSAGE,
      payload: mockOrdersData,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      data: mockOrdersData,
    });
  });
  it('should return initial wsOrders state with error is null', () => {
    const action = {
      type: WS_AUTH_CONNECTION_STOP,
      payload: mockOrdersData,
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: null,
    });
  });
  it('should return wsOrders initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = getWSUserOrders(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
