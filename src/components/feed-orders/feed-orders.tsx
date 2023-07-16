import { FC } from 'react';
import styles from './feed-orders.module.css';
import FeedOrdersItem from './feed-orders-item/feed-orders-item';

const FeedOrders: FC = () => {
  const ordersInfo = {orders: [
    {
      _id: '034535',
      ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0948"],
      status: 'done',
      name: 'Death Star Starship Main бургер',
      createdAt: 'Сегодня, 16:20',
      updatedAt: 'Сегодня, 16:20',
      number: 34535,
    },
    {
      _id: '034534',
      ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0948", "643d69a5c3f7b9001cfa0949", "643d69a5c3f7b9001cfa0947", "643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa0944"],
      status: 'created',
      name: 'Interstellar бургер',
      createdAt: 'Сегодня, 16:20',
      updatedAt: 'Сегодня, 16:20',
      number: 34534,
    },
    {
      _id: '034533',
      ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa0948"],
      status: 'pending1',
      name: 'Black Hole Singularity острый бургер',
      createdAt: 'Сегодня, 16:20',
      updatedAt: 'Сегодня, 16:20',
      number: 34533,
    },
  ]}
  const orders = ordersInfo.orders;

  return (
    <section>
      <h2
        className={`mt-10 mb-5 text text_type_main-large`}>
        Лента заказов
      </h2>
      <ul className={styles.feed}>
        {orders?.map((item) => (
          <FeedOrdersItem key={item._id} data={item} type="feed" />
        ))}
      </ul>
    </section>
  );
}

export default FeedOrders;
