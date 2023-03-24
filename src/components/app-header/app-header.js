import { useState } from 'react'
import styles from './app-header.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  const [currentPage, setCurrentPage] = useState('constructor')

  return (
    <header className={styles.appheader}>
      <nav className={`${styles.appheader__nav} pt-4 pb-4`}>
        <div className={styles.appheader__navElement}>
          <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type={currentPage === 'constructor' ? 'primary' : 'secondary'} />
            <p className={`${currentPage === 'constructor' ? styles.appheader__navLink__text : styles.appheader__navLink__text_inactive} text text_type_main-default ml-2`}>
              Конструктор
            </p>
          </div>
          <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
            <ListIcon type={currentPage === 'feed' ? 'primary' : 'secondary'} />
            <p className={`${currentPage === 'feed' ? styles.appheader__navLink__text : styles.appheader__navLink__text_inactive} text text_type_main-default ml-2`}>
              Лента заказов
            </p>
          </div>
        </div>
        <Logo />
        <div className={`${styles.appheader__navLink} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type={currentPage === 'lk' ? 'primary' : 'secondary'} />
          <p className={`${currentPage === 'lk' ? styles.appheader__navLink__text : styles.appheader__navLink__text_inactive} text text_type_main-default ml-2`}>
            Личный кабинет
          </p>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
