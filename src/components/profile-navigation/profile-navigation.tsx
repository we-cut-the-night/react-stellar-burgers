import { NavLink, useNavigate } from 'react-router-dom'
import styles from './profile-navigation.module.css'
import { useDispatch } from 'react-redux'
import { logout } from 'services/actions/auth'
import { FC, MouseEvent } from 'react'
import { TStoreDispatch } from 'utils/types'

const ProfileNavigation: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<TStoreDispatch>()

  const handleLogOut = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const data = { token: localStorage.getItem('refreshToken') }
    dispatch(logout(data, () => navigate('/login')))
  }

  const getClassName = (isActive: boolean) => {
    const defaultName = `${styles.navigationLink} text text_type_main-medium`
    return !isActive ? defaultName : `${defaultName} ${styles.navigationLinkActive}`
  }


  return (
    <div className={styles.root}>
      <nav className={styles.navigation}>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/profile"
            className={({isActive}) => getClassName(isActive)}
          >
            Профиль
          </NavLink>
        </div>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/profile/orders"
            className={({isActive}) => getClassName(isActive)}
          >
            История заказов
          </NavLink>
        </div>
        <div className={styles.navigationLinkWrapper}>
          <NavLink
            to="/login"
            className={({isActive}) => getClassName(isActive)}
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </div>
      </nav>
      <p
        className={`${styles.navigationComments} text text_type_main-default mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}

export default ProfileNavigation
