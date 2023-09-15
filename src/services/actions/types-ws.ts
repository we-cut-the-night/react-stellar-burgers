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
} from "./ws-actions";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START | typeof WS_AUTH_CONNECTION_START;
}

export interface IWSConnectionSuccess {
  readonly type:
    | typeof WS_CONNECTION_SUCCESS
    | typeof WS_AUTH_CONNECTION_SUCCESS;
  payload: Event;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR | typeof WS_AUTH_CONNECTION_ERROR;
  payload: Event;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED | typeof WS_AUTH_CONNECTION_CLOSED;
  payload: Event;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE | typeof WS_AUTH_GET_MESSAGE;
  payload: string;
}

export interface IWSConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP | typeof WS_AUTH_CONNECTION_STOP;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage
  | IWSConnectionStop;
