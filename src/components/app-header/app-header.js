import { NavLink, useLocation } from 'react-router-dom'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { urls } from 'utils/constants'
import styles from './app-header.module.css'

function AppHeader() {
  const location = useLocation()

  const getClassName = (isActive) => {
    const additionalStyles = "text text_type_main-default ml-2"
    return !isActive
      ? `${styles.appheader__navLink__text_inactive} ${additionalStyles}`
      : `${styles.appheader__navLink__text} ${additionalStyles}`
  }

  return (
    <header className={styles.appheader}>
      <nav className={`${styles.appheader__nav} pt-4 pb-4`}>
        <div className={styles.appheader__navElement}>
          <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
            <NavLink
              to={urls.constructor}
              className={({ isActive }) => getClassName(isActive)}
            >
              Конструктор
            </NavLink>
          </div>
          <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
            <NavLink
              to="/feed"
              className={({ isActive }) => getClassName(isActive)}
            >
              Лента заказов
            </NavLink>
          </div>
        </div>
        <NavLink to={urls.constructor} className={styles.logo}>
          <Logo />
        </NavLink>
        <div className={styles.appheader__navElement}>
          <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <NavLink
              to="/profile"
              className={({ isActive }) => getClassName(isActive)}
            >
              Личный кабинет
            </NavLink>
            {/* </Link> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
