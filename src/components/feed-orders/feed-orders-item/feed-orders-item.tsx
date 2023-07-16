import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientData } from "utils/types";
import { useSelector } from "react-redux";
import { getBurrentIngredients } from "services/selectors";
import styles from "./feed-orders-item.module.css";
import { getOrderPrice } from "utils/functions";

interface IFeedOrderItemProps {
  data: {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };
  type: string;
}

const FeedOrdersItem: FC<IFeedOrderItemProps> = ({ data, type }) => {
  const location = useLocation();
  const { ingredientsAll } = useSelector(getBurrentIngredients);
  const ingredientList = ingredientsAll?.filter((item) =>
    data?.ingredients.includes(item._id)
  );
  const orderContent = data?.ingredients.reduce(
    (arr: IIngredientData[], id: string) =>
      arr.concat(ingredientsAll?.filter((item) => item._id === id)),
    []
  );

  const path =
    type === "feed" ? `/feed/${data._id}` : `/profile/orders/${data._id}`;

  return (
    <Link
      to={{ pathname: path }}
      state={{ background: location }}
      className={styles.root}
    >
      <li className={`${styles.item}`}>
        <div className={`${styles.itemNumber}`}>
          <p className={`text text_type_digits-default`}>#{data?.number}</p>
          <p className={`${styles.itemCreated} text text_type_main-default`}>
            {data.createdAt}
          </p>
        </div>
        <h4 className={`text text_type_main-medium mt-6`}>{data?.name}</h4>
        {type === "profile" && (
          <p
            className={`${
              data?.status === "done"
                ? styles.itemStatus_theme_done
                : data?.status === ("created" || "pending")
                ? ""
                : styles.itemStatus_theme_cancelled
            } text text_type_main-default mt-2`}
          >
            {data?.status === "done"
              ? "Выполнен"
              : data?.status === "created"
              ? "Создан"
              : data?.status === "pending"
              ? "Готовится"
              : "Отменён"}
          </p>
        )}
        <div className={`${styles.itemProperties} mt-6`}>
          <ul className={`${styles.itemPropertiesIngredients}`}>
            {ingredientList?.slice(0, 6).map((item, index) => (
              <li
                key={item._id}
                className={`${styles.itemIngredientIcon}`}
                style={{
                  zIndex: 6 - index,
                  backgroundImage: `url(${item.image_mobile})`,
                }}
              >
                {ingredientList?.length > 6 && index === 5 && (
                  <div className={`${styles.itemIconOverlay}`}>
                    <p className={`text text_type_main-default`}>
                      +{ingredientList?.length - 5}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={`${styles.itemPropertiesPrice} ml-6`}>
            <p className={`text text_type_digits-default mr-2`}>
              {getOrderPrice(orderContent)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FeedOrdersItem;
