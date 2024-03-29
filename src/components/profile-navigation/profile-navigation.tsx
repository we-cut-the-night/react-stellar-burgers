import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./profile-navigation.module.css";
import { logout } from "services/actions/auth";
import { FC, MouseEvent } from "react";
import { useAppDispatch } from "hooks";

const ProfileNavigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogOut = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("refreshToken");
    const data = { token: token ? token : "" };
    dispatch(logout(data, () => navigate("/login")));
  };

  const getClassName = (isActive: boolean) => {
    const defaultName = `${styles.navigationLink} text text_type_main-medium`;
    return !isActive
      ? defaultName
      : `${defaultName} ${styles.navigationLinkActive}`;
  };

  return (
    <div className={styles.root}>
      <nav className={styles.navigation}>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/profile"
            className={({ isActive }) => getClassName(isActive)}
          >
            Профиль
          </NavLink>
        </div>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) => getClassName(isActive)}
          >
            История заказов
          </NavLink>
        </div>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/login"
            className={({ isActive }) => getClassName(isActive)}
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </div>
      </nav>
      <p
        className={`${styles.navigationComments} text text_type_main-default mt-20`}
      >
        {pathname === "/profile"
          ? "В этом разделе вы можете изменить свои персональные данные"
          : pathname === "/profile/orders"
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : ""}
      </p>
    </div>
  );
};

export default ProfileNavigation;
