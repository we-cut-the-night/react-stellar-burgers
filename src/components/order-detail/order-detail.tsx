import { FC, } from "react";
import { useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderPrice } from "utils/functions";
import {
  getBurrentIngredients,
  getWSOrders,
  getWSUserOrders,
} from "services/selectors";
import styles from "./order-detail.module.css";
import { IIngredientData, IWSOrder } from "utils/types";
import { useAppSelector } from "hooks";

interface IOrderDetailProps {
  type: string;
}

const OrderDetail: FC<IOrderDetailProps> = ({ type }) => {
  const { pathname } = useLocation();
  const { ingredientsAll } = useAppSelector(getBurrentIngredients);
  const { data } = useAppSelector(getWSOrders);
  const { data: userOrders } = useAppSelector(getWSUserOrders);
  const ordersInfo = data && JSON.parse(data);
  const userOrdersData = userOrders && JSON.parse(userOrders);
  const path = pathname.split("/");

  const orders = pathname.startsWith("/profile")
    ? userOrdersData.orders
    : ordersInfo.orders;
  const currentOrder = orders?.find((item: IWSOrder) => item._id === path[path.length-1])!;
  const ingredientsDistinct = Array.from(new Set(currentOrder?.ingredients));

  const orderIngredients = currentOrder?.ingredients.map((item: string) => {
    return ingredientsAll?.find((element) => element._id === item)!;
  });

  const orderDetails = ingredientsDistinct?.map((item) => {
    return orderIngredients?.filter(
      (element: IIngredientData) => element?._id === item
    );
  });

  return (
    <div className={styles.root}>
      {typeof currentOrder?.number !== "undefined" && (
        <>
          <p
            className={`${
              type === "page" ? styles.orderDetailNumber : ""
            } text text_type_digits-default mb-10`}
          >
            #{currentOrder?.number}
          </p>
          <h4 className={`text text_type_main-medium mb-3`}>
            {currentOrder?.name}
          </h4>
          <p
            className={`${
              currentOrder?.status === "done"
                ? styles.orderDetailStatus_theme_finished
                : currentOrder?.status === "created" || "pending"
                ? ""
                : styles.orderDetailStatus_theme_canceled
            } text text_type_main-default mb-15`}
          >
            {currentOrder?.status === "done"
              ? "Выполнен"
              : currentOrder?.status === "created"
              ? "Создан"
              : currentOrder?.status === "pending"
              ? "Готовится"
              : "Отменён"}
          </p>
        </>
      )}
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`${styles.orderDetailItems}`}>
        {orderDetails?.map((item, i) => (
          <li key={i} className={styles.orderDetailIngredient}>
            {typeof item[0] !== "undefined" && (
              <>
                <div className={styles.orderDetailIngredientContent}>
                  <div
                    className={`${styles.orderDetailIngredientIcon}`}
                    style={{
                      backgroundImage: `url(${item[0]?.image_mobile})`,
                    }}
                  />
                  <h5 className={`text text_type_main-default`}>
                    {item[0]?.name}
                  </h5>
                </div>
                <div className={`${styles.orderDetailPrice}`}>
                  <p className={`text text_type_digits-default mr-2`}>
                    {item[0]?.type === "bun" ? 2 : item?.length} x{" "}
                    {item[0]?.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className={`${styles.orderDetailSummary}`}>
        <p className={`${styles.orderDetailDate} text text_type_main-default`}>
          {currentOrder?.createdAt}
        </p>
        <div className={`${styles.orderDetailPrice} ml-2`}>
          <p className={`text text_type_digits-default mr-2`}>
            {typeof orderIngredients !== "undefined" &&
              getOrderPrice(orderIngredients)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
