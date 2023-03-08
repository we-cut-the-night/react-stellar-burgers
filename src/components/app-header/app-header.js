import appHeaderStyles from './app-header.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={appHeaderStyles.appheader}>
      <nav className={appHeaderStyles.appheader__nav}>
        <BurgerIcon />
        <p className="text text_type_main-default">Конструктор</p>
        <ListIcon />
        <p className="text text_type_main-default">Лента заказов</p>
        <Logo />
        <ProfileIcon />
        <p className="text text_type_main-default">Личный кабинет</p>
      </nav>
    </header>
  )
}

export default AppHeader
