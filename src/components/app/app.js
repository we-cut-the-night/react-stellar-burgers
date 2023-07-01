import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Modal from 'components/modal/modal'
import AppHeader from 'components/app-header/app-header'
import IngridientDetails from 'components/burger-ingredients/ingridient-details/ingridient-details'
import OrderDetails from 'components/burger-constructor/order-details/order-details'
import { getIngredients } from 'services/api'
import { ORDER_CLOSE, CLOSE_INGREDIENT_DETAILS, LOGIN } from 'services/actions'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import ForgotPassword from 'pages/forgot-password/forgot-password'
import ResetPassword from 'pages/reset-password/reset-password'
import Profile from 'pages/profile/profile'
import { ProtectedRouteElement } from 'components/protected-route-element/protected-route-element'
import IngredientDetails from 'pages/ingredient-details/ingredient-details'
import Constructor from 'pages/constructor/constructor'
import { urls } from 'utils/constants'
import { getIngredientDetailsIsOpen, getOrderIsOpen } from 'services/selectors'
import { getUserData } from 'services/actions/auth'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const ingredientDetailsIsOpen = useSelector(getIngredientDetailsIsOpen)
  const orderIsOpen = useSelector(getOrderIsOpen)

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
    location.pathname !== urls.constructor && navigate(-1)
  }

  useEffect(() => {
    const token = localStorage.getItem('refreshToken')
    token && dispatch({ type: LOGIN })
    dispatch(getIngredients())
    dispatch(getUserData())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Routes location={ingredientDetailsIsOpen ? {...location, pathname: urls.constructor} : location}>
        <Route path={urls.constructor} element={<Constructor />} />
        <Route path={urls.login} element={<Login />} />
        <Route path={urls.register} element={<Register />} />
        <Route path={urls.forgotPassword} element={<ForgotPassword />} />
        <Route path={urls.resetPassword} element={<ResetPassword />} />
        <Route path={urls.profile} exact element={<ProtectedRouteElement element={<Profile />} />} />
        <Route path={urls.orders} exact element={<ProtectedRouteElement element={<h2>История заказов</h2>} />} />
        <Route path={urls.ordersId} element={<ProtectedRouteElement element={<h2>Детали заказа</h2>} />} />
        <Route path={urls.ingredientsId} element={<IngredientDetails />} />
        <Route path={urls.notFound} element={<h2>Страница не найдена</h2>} />
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
