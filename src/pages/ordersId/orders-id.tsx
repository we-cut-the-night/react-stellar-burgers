import { FC, useEffect } from "react";
import styles from "./orders-id.module.css";
import OrderDetail from "components/order-detail/order-detail";
import { getWSUserOrders } from "services/selectors";
import { useLocation } from "react-router-dom";
import { getCookies } from "utils/cookies";
import { refreshTokenAndGetUser } from "services/actions/auth";
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from "services/actions/ws-actions";
import { useAppDispatch, useAppSelector } from "hooks";

const OrdersId: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getWSUserOrders);
  const { pathname } = useLocation();

  function connectWithTokenCheck() {
    const accessToken = getCookies("accessToken");

    if (!accessToken || data.includes("Invalid or missing token")) {
      refreshTokenAndGetUser()
        .then(() => {
          dispatch({ type: WS_AUTH_CONNECTION_START });
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      dispatch({ type: WS_AUTH_CONNECTION_START });
    }
  }

  useEffect(() => {
    pathname.startsWith("/profile")
      ? connectWithTokenCheck()
      : dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({
        type: pathname.startsWith("/profile")
          ? WS_AUTH_CONNECTION_STOP
          : WS_CONNECTION_STOP,
      });
    };
  }, []);

  return (
    <main className={styles.root}>
      <OrderDetail type="page" />
    </main>
  );
};

export default OrdersId;
