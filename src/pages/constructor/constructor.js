import BurgerConstructor from "components/burger-constructor/burger-constructor"
import BurgerIngredients from "components/burger-ingredients/burger-ingridients"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styles from './constructor.module.css'

function Constructor() {
  return (
    <main className={styles.root}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}

export default Constructor
