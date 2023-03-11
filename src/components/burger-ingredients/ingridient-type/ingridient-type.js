import PropTypes from 'prop-types'
import IngredientItem from '../ingridient-item/ingridient-item'
import styles from './ingridient-type.module.css'

function IngredientType({ id, title, items, onClick }) {
  return (
    <li id={id}>
      <h3 className='text text_type_main-medium'>{title}</h3>
      <ul className={`${styles.ingridientList} pt-6 pb-10 pl-4 pr-4`}>
        {items.map((item, i) => {
          return (
            <IngredientItem key={i} item={item} onClick={onClick} />
          )
        })}
      </ul>
    </li>
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

IngredientType.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(constructorPropTypes),
  onClick: PropTypes.func,
}

export default IngredientType
