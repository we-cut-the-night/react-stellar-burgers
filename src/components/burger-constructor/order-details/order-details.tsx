import Accepted from "../../../images/accepted.png";
import styles from "./order-details.module.css";
import { getOrder } from "services/selectors";
import { FC } from "react";
import { useAppSelector } from "hooks";
import Preloader from "components/preloader/Preloader";

const OrderDetails: FC = () => {
  const { order, orderRequest } = useAppSelector(getOrder);

  return (
    <div className={`${styles.orderDetails} pt-30 pb-30`}>
      {orderRequest ? (
        <div className="mt-30 mb-30">
          <Preloader />
        </div>
      ) : (
        <>
          <h2 className="text text_type_digits-large">{order.number}</h2>
          <p className="mt-8 mb-15 text text_type_main-medium">
            идентификатор заказа
          </p>
          <img className={styles.orderImage} src={Accepted} alt="успешно" />
          <p
            className={`${styles.orderMsg} mt-15 mb-2 text text_type_main-default`}
          >
            Ваш заказ начали готовить
          </p>
          <p className={`${styles.orderMsgAdd} text text_type_main-default`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
