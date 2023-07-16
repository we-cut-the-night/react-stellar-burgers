import { FC } from "react";
import styles from "./orders-history.module.css";
import ProfileNavigation from "components/profile-navigation/profile-navigation";
import FeedOrdersItem from "components/feed-orders/feed-orders-item/feed-orders-item";

const OrdersHistory: FC = () => {
  const ordersInfo = {
    orders: [
      {
        _id: "034535",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0948",
        ],
        status: "done",
        name: "Death Star Starship Main бургер",
        createdAt: "Сегодня, 16:20",
        updatedAt: "Сегодня, 16:20",
        number: 34535,
      },
      {
        _id: "034534",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa0949",
          "643d69a5c3f7b9001cfa0947",
          "643d69a5c3f7b9001cfa0946",
          "643d69a5c3f7b9001cfa0944",
        ],
        status: "created",
        name: "Interstellar бургер",
        createdAt: "Сегодня, 16:20",
        updatedAt: "Сегодня, 16:20",
        number: 34534,
      },
      {
        _id: "034533",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0948",
        ],
        status: "pending1",
        name: "Black Hole Singularity острый бургер",
        createdAt: "Сегодня, 16:20",
        updatedAt: "Сегодня, 16:20",
        number: 34533,
      },
    ],
  };
  const orders = ordersInfo.orders;

  return (
    <main className={`${styles.root}`}>
      <ProfileNavigation />
      <ul className={`${styles.ordersHistoryItems}`}>
        {orders.map((item) => (
          <FeedOrdersItem key={item._id} data={item} type="profile" />
        ))}
      </ul>
    </main>
  );
};

export default OrdersHistory;
