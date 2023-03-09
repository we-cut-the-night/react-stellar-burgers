import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { getIngridientsData } from '../../utils/api'
import styles from './app.module.css'
import Modal from '../modal/modal';

function App() {
  const [ingridientsData, setIngridientsData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const getBurgerData = () => {
    getIngridientsData()
      .then(res => setIngridientsData(res.data))
      .catch(err => console.log('Ошибка: ', err))
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    getBurgerData()
  }, [])

  useEffect(() => { // test
    console.log('burgerData: ', ingridientsData)
  }, [ingridientsData])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={ingridientsData} />
        <BurgerConstructor />
      </main>
      {modalIsOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default App;
