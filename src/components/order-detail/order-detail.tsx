import { FC } from "react"
import { useLocation, useParams } from "react-router-dom"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { getOrderPrice } from "utils/functions"
import { getBurrentIngredients } from "services/selectors"
import { useSelector } from "react-redux"
import styles from "./order-detail.module.css"

interface IOrderDetailProps {
  type: string;
}

const OrderDetail: FC<IOrderDetailProps> = ({ type }) => {
  const { pathname } = useLocation()
  const { id } = useParams()
  const { ingredientsAll } = useSelector(getBurrentIngredients)

  const userOrdersInfo = {
    orders: [
      {
        _id: "034535",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0948",
          "643d69a5c3f7b9001cfa093c",
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
  }

  const ordersInfo = userOrdersInfo;
  const orders = pathname.startsWith("/profile")
    ? userOrdersInfo.orders
    : ordersInfo.orders;
  const currentOrder = orders?.find((item) => item._id === id)!;
  const ingredientsDistinct = Array.from(new Set(currentOrder?.ingredients))

  const orderIngredients = currentOrder?.ingredients.map((item: string) => {
    return ingredientsAll?.find((element) => element._id === item)!;
  })

  const groupedOrderContent = ingredientsDistinct?.map((item) => {
    return orderIngredients?.filter((element) => element?._id === item);
  })

  return (
    <div className={styles.root}>
      {typeof currentOrder.number !== "undefined" && (
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
        {groupedOrderContent?.map((item, i) => (
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
            {typeof orderIngredients[0] !== "undefined" &&
              getOrderPrice(orderIngredients)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
