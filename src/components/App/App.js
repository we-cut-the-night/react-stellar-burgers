import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import IngridientDetails from '../burger-ingredients/ingridient-details/ingridient-details';
import OrderDetails from '../burger-constructor/order-details/order-details'
import { getIngridientsData } from '../../utils/api'
import Modal from '../modal/modal';

import styles from './app.module.css'

function App() {
  const [ingridientsData, setIngridientsData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalItemIngridient, setModalItemIngidient] = useState({
    image_large: '',
    name: '',
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fat: 0,
  })
  const [modalItemOrder, setModalItemOrder] = useState(null)

  const getBurgerData = () => {
    getIngridientsData()
      .then(res => setIngridientsData(res.data))
      .catch(err => console.log('Ошибка: ', err))
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setModalItemOrder(null)
    setModalItemIngidient({
      image_large: '',
      name: '',
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      fat: 0,
    })
  }

  const handleItemClick = (item) => {
    setModalItemIngidient(item)
    setModalIsOpen(true)
  }

  const handleOrderClick = () => {
    setModalItemOrder('034536')
    setModalIsOpen(true)
  }

  useEffect(() => getBurgerData(), [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={ingridientsData} onClick={handleItemClick} />
        <BurgerConstructor data={ingridientsData} onClick={handleOrderClick}/>
      </main>
      {modalIsOpen && (
        <Modal onClose={closeModal}>
          {
            modalItemOrder ? (
              <OrderDetails id={modalItemOrder} />
            ) : modalItemIngridient?.name && (
              <IngridientDetails item={modalItemIngridient} />
            )
          }
        </Modal>
      )}
    </>
  );
}

export default App;
