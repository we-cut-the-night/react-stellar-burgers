import { useEffect } from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import IngridientDetails from '../burger-ingredients/ingridient-details/ingridient-details';
import OrderDetails from '../burger-constructor/order-details/order-details'
import Modal from '../modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/api'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ORDER_CLOSE, CLOSE_INGREDIENT_DETAILS} from '../../services/actions'
import styles from './app.module.css'

function App() {
  const dispatch = useDispatch()
  const ingredientDetailsIsOpen = useSelector(store => store.ingredientDetails.isOpen)
  const orderIsOpen = useSelector(store => store.order.isOpen)

  const closeModal = () => {

    if (orderIsOpen) {
      dispatch({
        type: ORDER_CLOSE,
      })
    } else if (ingredientDetailsIsOpen) {
      dispatch({
        type: CLOSE_INGREDIENT_DETAILS,
      })
    }
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {(orderIsOpen || ingredientDetailsIsOpen) && (
        <Modal onClose={closeModal}>
          {
            orderIsOpen ? (
              <OrderDetails />
            ) : ingredientDetailsIsOpen && (
              <IngridientDetails />
            )
          }
        </Modal>
      )}
    </>
  );
}

export default App
