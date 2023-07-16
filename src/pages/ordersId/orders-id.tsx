
import { FC } from 'react';
import styles from './orders-id.module.css'
import OrderDetail from 'components/order-detail/order-detail';

const OrdersId: FC = () => {
  return (
    <main className={styles.root}>
      <OrderDetail type="page" />
    </main>
  );
}

export default OrdersId;
