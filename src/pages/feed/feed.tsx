import { FC } from "react";
import FeedOrders from "components/feed-orders/feed-orders";
import styles from "./feed.module.css";
import FeedStat from "components/feed-orders/feed-stat/feed-stat";

const Feed: FC = () => {
  return (
    <main className={`${styles.root}`}>
      <FeedOrders />
      <FeedStat />
    </main>
  );
};

export default Feed;
