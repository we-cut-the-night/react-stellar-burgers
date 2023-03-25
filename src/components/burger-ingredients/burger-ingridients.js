import { useRef } from 'react'
import PropTypes from 'prop-types'
import IngredientType from './ingridient-type/ingridient-type'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingridients.module.css'
import { ingridientTypes } from '../../utils/constants'
import { ingredientPropType } from '../../utils/types'
import { useSelector, useDispatch } from 'react-redux'
import { SET_INGRIDIENT_TAB } from '../../services/actions'

function BurgerIngredients({ onClick }) {
  const dispatch = useDispatch()
  const { ingredientsAll } = useSelector(store => store.burgerIngredients)
  const { currentIngredientTab } = useSelector(store => store.burgerIngredients)
  const ingridientList = useRef(null);
  const bun = useRef(null);
  const sauce = useRef(null);
  const main = useRef(null);

  const handleClickTab = (type) => document.querySelector(`#${type}`).scrollIntoView({ behavior: 'smooth' })

  const handleScrollIngredients = () => {

    if (ingridientList && bun && sauce && main) {
      const listCurrentTop = ingridientList?.current?.getBoundingClientRect()?.top
      const bunDelta = Math.abs(listCurrentTop - bun?.current?.getBoundingClientRect()?.top)
      const sauceDelta = Math.abs(listCurrentTop - sauce?.current?.getBoundingClientRect()?.top)
      const mainDelta = Math.abs(listCurrentTop - main?.current?.getBoundingClientRect()?.top)
      const minDelta = Math.min(bunDelta, sauceDelta, mainDelta)

      let tab = null
      if (minDelta === bunDelta) {tab = ingridientTypes[0].type}
      else if (minDelta === sauceDelta) {tab = ingridientTypes[1].type}
      else if (minDelta === mainDelta) {tab = ingridientTypes[2].type}

      dispatch({
        type: SET_INGRIDIENT_TAB,
        currentIngredientTab: tab
      })
    }
  }

  return (
    <section className={styles.burgerIngridients}>
      <h2 className='text text_type_main-large mt-10 mb-5'>
        Соберите бургер
      </h2>
      <ul className={`${styles.burgerIngridients__nav}`}>
        {
          ingridientTypes.map((item, i) => {
            return (
              <Tab
                key={i}
                value={item.type}
                active={currentIngredientTab === item.type}
                onClick={handleClickTab}
              >
                {item.title}
              </Tab>
            )
          })
        }
      </ul>
      <ul
        ref={ingridientList}
        className={`${styles.burgerIngridients__typeList} mt-10`}
        onScroll={handleScrollIngredients}
      >
        {ingridientTypes.map((item, i) => {
          const filteredData = ingredientsAll.filter(ingridient => ingridient.type === item.type)
          let ref = null
          if (item.type === ingridientTypes[0].type) {ref = bun}
          else if (item.type === ingridientTypes[1].type) {ref = sauce}
          else if (item.type === ingridientTypes[2].type) {ref = main}

          return (
            <IngredientType key={i} id={item.type} ref={ref} title={item.title} items={filteredData} onClick={onClick} />
          )
        })}
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientPropType),
  onClick: PropTypes.func,
}

export default BurgerIngredients
