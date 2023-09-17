import { FC, useEffect } from "react";
import styles from "./orders-history.module.css";
import ProfileNavigation from "components/profile-navigation/profile-navigation";
import FeedOrdersItem from "components/feed-orders/feed-orders-item/feed-orders-item";
import { useAppDispatch, useAppSelector } from "hooks";
import { getWSUserOrders } from "services/selectors";
import { refreshTokenAndGetUser } from "services/actions/auth";
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
} from "services/actions/ws-actions";
import { IWSOrder } from "utils/types";
import { getCookies } from "utils/cookies";

const OrdersHistory: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getWSUserOrders);
  const ordersData = data && JSON.parse(data);
  const orders = ordersData.orders;

  useEffect(() => {
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

    return () => {
      dispatch({ type: WS_AUTH_CONNECTION_STOP });
    };
  }, []);

  return (
    <main className={`${styles.root}`}>
      <ProfileNavigation />
      <ul className={`${styles.ordersHistoryItems}`}>
        {typeof orders !== "undefined" &&
          orders.map((item: IWSOrder) => (
            <FeedOrdersItem key={item._id} data={item} type="profile" />
          ))}
      </ul>
    </main>
  );
};

export default OrdersHistory;
