import { FC, useEffect } from "react";
import FeedOrders from "components/feed-orders/feed-orders";
import styles from "./feed.module.css";
import FeedStat from "components/feed-orders/feed-stat/feed-stat";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from "services/actions/ws-actions";
import { useAppDispatch } from "hooks";

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_STOP });
    };
  }, []);

  return (
    <main className={`${styles.root}`}>
      <FeedOrders />
      <FeedStat />
    </main>
  );
};

export default Feed;
