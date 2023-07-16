import { FC } from "react";
import FeedOrders from "components/feed-orders/feed-orders";
import styles from "./feed.module.css";

const Feed: FC = () => {
  return (
    <main className={`${styles.root}`}>
      <FeedOrders />
    </main>
  );
};

export default Feed;
