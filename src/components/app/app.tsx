import { FC, useEffect, useState } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Modal from "components/modal/modal";
import AppHeader from "components/app-header/app-header";
import IngridientDetails from "components/burger-ingredients/ingridient-details/ingridient-details";
import OrderDetails from "components/burger-constructor/order-details/order-details";
import { getIngredients } from "services/api";
import { ORDER_CLOSE, CLOSE_INGREDIENT_DETAILS, LOGIN } from "services/actions";
import Login from "pages/login/login";
import Register from "pages/register/register";
import ForgotPassword from "pages/forgot-password/forgot-password";
import ResetPassword from "pages/reset-password/reset-password";
import Profile from "pages/profile/profile";
import { ProtectedRouteElement } from "components/protected-route-element/protected-route-element";
import IngredientDetails from "pages/ingredient-details/ingredient-details";
import Constructor from "pages/constructor/constructor";
import { urls } from "utils/constants";
import { getIngredientDetailsIsOpen, getOrder } from "services/selectors";
import { getUserData } from "services/actions/auth";
import Feed from "pages/feed/feed";
import OrdersId from "pages/ordersId/orders-id";
import OrdersHistory from "pages/orders-history/orders-history";
import OrderDetail from "components/order-detail/order-detail";
import { useAppDispatch, useAppSelector } from "hooks";

const getModalContentType = (path: string) => {
  if (path === "/") return "newOrder";
  else if (path.startsWith("/ingredients")) return "ingredientDetails";
  else if (path.startsWith("/feed")) return "orderDetailsFeed";
  else if (path.startsWith("/profile")) return "orderDetailsProfile";
  else return "";
};

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location?.state?.background;
  const navigate = useNavigate();
  const ingredientDetailsIsOpen = useAppSelector(getIngredientDetailsIsOpen);
  const { isOpen: orderIsOpen } = useAppSelector(getOrder);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    if (orderIsOpen) {
      dispatch({
        type: ORDER_CLOSE,
      });
    } else if (ingredientDetailsIsOpen) {
      dispatch({
        type: CLOSE_INGREDIENT_DETAILS,
      });
    }
    if(location.pathname.includes('/profile/orders')) {
      navigate('/profile/orders')
    } else if(location.pathname.includes('/feed')) {
      navigate('/feed')
    } else {
      navigate('/')
    }
  };

  useEffect(
    () => setModalContent(getModalContentType(location.pathname)),
    [location.pathname]
  );

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    token && dispatch({ type: LOGIN });
    dispatch(getIngredients());
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={(ingredientDetailsIsOpen || orderIsOpen) ? (background || location) : location}>
        <Route
          path={urls.login}
          element={<ProtectedRouteElement isNotAuth={true} element={<Login />} />}
        />
        <Route
          path={urls.register}
          element={<ProtectedRouteElement isNotAuth={true} element={<Register />} />}
        />
        <Route
          path={urls.forgotPassword}
          element={<ProtectedRouteElement isNotAuth={true} element={<ForgotPassword />} />}
        />
        <Route
          path={urls.resetPassword}
          element={<ProtectedRouteElement isNotAuth={true} element={<ResetPassword />} />}
        />
        <Route path={urls.constructor} element={<Constructor />} />
        <Route path={urls.feed} element={<Feed />} />
        <Route path={urls.feedId} element={<OrdersId />} />
        <Route path={urls.ingredientsId} element={<IngredientDetails />} />
        <Route path={urls.notFound} element={<h2>Страница не найдена</h2>} />
        <Route
          path={urls.orders}
          element={<ProtectedRouteElement isNotAuth={false} element={<OrdersHistory />} />}
        />
        <Route
          path={urls.ordersId}
          element={<ProtectedRouteElement isNotAuth={false} element={<OrdersId />} />}
        />
        <Route
          path={urls.profile}
          element={<ProtectedRouteElement isNotAuth={false} element={<Profile />} />}
        />
        <Route
          path={urls.orders}
          element={<ProtectedRouteElement isNotAuth={false} element={<h2>История заказов</h2>} />}
        />
        <Route
          path={urls.ordersId}
          element={<ProtectedRouteElement isNotAuth={false} element={<h2>Детали заказа</h2>} />}
        />
      </Routes>
      {(orderIsOpen || ingredientDetailsIsOpen) && (
        <Modal onClose={closeModal}>
          {orderIsOpen && modalContent === "newOrder" && <OrderDetails />}
          {orderIsOpen &&
            (modalContent === "orderDetailsFeed" ||
              modalContent === "orderDetailsProfile") && (
              <OrderDetail type="modal" />
            )}
          {!orderIsOpen && ingredientDetailsIsOpen && <IngridientDetails />}
        </Modal>
      )}
    </>
  );
};

export default App;
