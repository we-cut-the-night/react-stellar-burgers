import { FC } from "react";
import styles from "./feed-stat.module.css";

const FeedStat: FC = () => {
  const ordersData = {
    total: 100,
    totalToday: 100,
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
  const ordersDone = ordersData?.orders?.filter(
    (item) => item.status === "done"
  );
  const ordersProcessing = ordersData?.orders?.filter((item) => item.status !== "done");

  return (
    <section
      className={`${styles.root} pt-25 pb-10`}
      aria-label="статистика заказов"
    >
      <div className={`${styles.statContent}`}>
        <div className={`${styles.statOrdersContent}`}>
          <div>
            <p className={`text text_type_main-medium pb-6`}>Готовы:</p>
            <ul className={`${styles.statOrders}`}>
              {ordersDone?.map((item) => (
                <li
                  className={`${styles.statistics__order} ${styles.statOrder_status_completed} text text_type_digits-default`}
                  key={item._id}
                >
                  {item.number}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`text text_type_main-medium pb-6`}>В работе:</p>
            <ul className={`${styles.statOrders}`}>
              {ordersProcessing?.map((item) => (
                <li
                  className={`${styles.statistics__order} text text_type_digits-default`}
                  key={item._id}
                >
                  {item.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={`text text_type_main-medium mt-15`}>
          Выполнено за все время:
        </p>
        <p className={`${styles.statTotal} text text_type_digits-large`}>
          {ordersData?.total}
        </p>
        <p className={`text text_type_main-medium mt-15`}>
          Выполнено за сегодня:
        </p>
        <p className={`${styles.statTotal} text text_type_digits-large`}>
          {ordersData?.totalToday}
        </p>
      </div>
    </section>
  );
};

export default FeedStat;
