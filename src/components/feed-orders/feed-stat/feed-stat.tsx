import { FC } from "react";
import styles from "./feed-stat.module.css";
import { getWSOrders } from "services/selectors";
import { useSelector } from "react-redux";
import { IWSOrder } from "utils/types";

const FeedStat: FC = () => {
  const { data } = useSelector(getWSOrders)
  const ordersData = data && JSON.parse(data)
  const ordersDone = ordersData?.orders?.filter(
    (item: IWSOrder) => item.status === "done"
  )
  const ordersProcessing = ordersData?.orders?.filter((item: IWSOrder) => item.status !== "done")

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
              {ordersDone?.map((item: IWSOrder) => (
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
              {ordersProcessing?.map((item: IWSOrder) => (
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
