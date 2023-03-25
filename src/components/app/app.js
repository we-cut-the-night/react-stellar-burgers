import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import IngridientDetails from '../burger-ingredients/ingridient-details/ingridient-details';
import OrderDetails from '../burger-constructor/order-details/order-details'
import Modal from '../modal/modal'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/api'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css'

const defaultIngredient = {
  image_large: '',
  name: '',
  calories: 0,
  carbohydrates: 0,
  proteins: 0,
  fat: 0,
}

function App() {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalItemIngridient, setModalItemIngidient] = useState(defaultIngredient)
  const [modalItemOrder, setModalItemOrder] = useState(null)

  const closeModal = () => {
    setModalIsOpen(false)
    setModalItemOrder(null)
    setModalItemIngidient(defaultIngredient)
  }

  const handleItemClick = (item) => {
    setModalItemIngidient(item)
    setModalIsOpen(true)
  }

  const handleOrderClick = () => {
    setModalItemOrder('034536')
    setModalIsOpen(true)
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients onClick={handleItemClick} />
          <BurgerConstructor onClick={handleOrderClick} />
        </DndProvider>
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

export default App
