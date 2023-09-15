import { FC } from 'react';
import styles from './feed-orders.module.css';
import FeedOrdersItem from './feed-orders-item/feed-orders-item';
import { getWSOrders } from 'services/selectors';
import { IWSOrder } from 'utils/types';
import { useAppSelector } from 'hooks';

const FeedOrders: FC = () => {
  const { data } = useAppSelector(getWSOrders);
  const ordersData = data && JSON.parse(data);
  const orders = ordersData.orders;

  return (
    <section>
      <h2
        className={`mt-10 mb-5 text text_type_main-large`}>
        Лента заказов
      </h2>
      <ul className={styles.feed}>
        {orders?.map((item: IWSOrder) => (
          <FeedOrdersItem key={item._id} data={item} type="feed" />
        ))}
      </ul>
    </section>
  );
}

export default FeedOrders;
