import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Modal from 'components/modal/modal'
import AppHeader from 'components/app-header/app-header'
import BurgerIngredients from 'components/burger-ingredients/burger-ingridients'
import BurgerConstructor from 'components/burger-constructor/burger-constructor'
import IngridientDetails from 'components/burger-ingredients/ingridient-details/ingridient-details';
import OrderDetails from 'components/burger-constructor/order-details/order-details'
import { getIngredients } from 'services/api'
import { ORDER_CLOSE, CLOSE_INGREDIENT_DETAILS, LOGIN } from 'services/actions'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import ForgotPassword from 'pages/forgot-password/forgot-password'
import ResetPassword from 'pages/reset-password/reset-password'
import Profile from 'pages/profile/profile'
import styles from './app.module.css'
import { ProtectedRouteElement } from 'components/protected-route-element/protected-route-element'
import IngredientDetails from 'pages/ingredient-details/ingredient-details';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
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
    navigate(-1)
  }

  useEffect(() => {
    const token = localStorage.getItem('refreshToken')
    token && dispatch({ type: LOGIN })
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Routes location={ingredientDetailsIsOpen ? {...location, pathname: "/"} : location}>
        <Route path="/" element={
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" exact element={<ProtectedRouteElement element={<Profile />} />} />
        <Route path="/profile/orders" exact element={<ProtectedRouteElement element={<h2>История заказов</h2>} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<h2>Детали заказа</h2>} />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="*" element={<h2>Страница не найдена</h2>} />
      </Routes>
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
    </>);
}

export default App
