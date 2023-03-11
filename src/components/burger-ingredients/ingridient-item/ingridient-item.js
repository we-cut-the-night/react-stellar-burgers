import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './ingridient-item.module.css'

function IngredientItem({ item, onClick }) {
  const handleClickItem = () => {
    onClick(item)
  }

  return (
    <li className={style.ingridientItem} onClick={handleClickItem}>
      <img
        className='ml-4 mr-4'
        src={item.image}
        alt={item.name}
      />
      <div className={`${style.ingridientItem__price} mt-1 mb-1`}>
        <p className='text text_type_digits-default pr-2'>{item.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h4 className={`${style.ingridientItem__name} text text_type_main-default`}>{item.name}</h4>
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

IngredientItem.propTypes = {
  item: constructorPropTypes,
  onClick: PropTypes.func,
}

export default IngredientItem
