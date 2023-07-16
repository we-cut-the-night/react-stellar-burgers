import { FC, useEffect } from "react";
import FeedOrders from "components/feed-orders/feed-orders";
import styles from "./feed.module.css";
import FeedStat from "components/feed-orders/feed-stat/feed-stat";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from "services/actions/ws-actions";
import { useDispatch } from "react-redux";

const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_STOP });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`${styles.root}`}>
      <FeedOrders />
      <FeedStat />
    </main>
  );
};

export default Feed;
