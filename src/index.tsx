import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "./services/reducers";
import reportWebVitals from "./reportWebVitals";
import App from "./components/app/app";
import "./index.css";
import { wsMiddleware } from "services/middleware/middleware-ws";
import { WS_URL } from "utils/constants";
import { wsActions, wsAuthActions } from "services/actions/ws-actions";

const composeEnhancers =
  // @ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    wsMiddleware(`${WS_URL}/all`, wsActions),
    wsMiddleware(WS_URL, wsAuthActions, true)
  )
);
export const store = legacy_createStore(rootReducer, enhancer);
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
