import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import IngredientItem from '../ingridient-item/ingridient-item'
import { ingredientPropType } from '../../../utils/types'
import styles from './ingridient-type.module.css'

const IngredientType = forwardRef(({ id, title, items, onClick }, ref) => {
  return (
    <li id={id} ref={ref}>
      <h3 className='text text_type_main-medium'>{title}</h3>
      <ul className={`${styles.ingridientList} pt-6 pb-10 pl-4 pr-4`}>
        {items.map(item => {
          return (
            <IngredientItem key={item._id} item={item} onClick={onClick} />
          )
        })}
      </ul>
    </li>
  )
})

IngredientType.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientPropType),
  onClick: PropTypes.func,
}

export default IngredientType
