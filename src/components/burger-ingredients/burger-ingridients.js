import { useState } from 'react'
import PropTypes from 'prop-types'
import IngredientType from './ingridient-type/ingridient-type'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.css'
import { ingridientTypes } from '../../utils/constants'

function BurgerIngredients({ data, onClick }) {
  const [current, setCurrent] = useState(ingridientTypes[0].type)
  const handleClickTab = (type) => {
    setCurrent(type)
    document.querySelector(`#${type}`).scrollIntoView()
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
                active={current === item.type}
                onClick={handleClickTab}
              >
                {item.title}
              </Tab>
            )
          })
        }
      </ul>
      <ul className={`${styles.burgerIngridients__typeList} mt-10`}>
        {ingridientTypes.map((item, i) => {
          const filteredData = data.filter(ingridient => ingridient.type === item.type)
          return (
            <IngredientType key={i} id={item.type} title={item.title} items={filteredData} onClick={onClick}/>
          )
        })}
      </ul>
    </section>
  )
}

const constructorPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
})

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(constructorPropTypes),
  onClick: PropTypes.func,
}

export default BurgerIngredients
