import PropTypes from 'prop-types'
import {ingredientPropType} from '../../../utils/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import style from './ingridient-item.module.css'

function IngredientItem({ item, onClick }) {
  const { constructor } = useSelector(store => store.burgerConstructor)
  const amount = constructor.filter(i => i._id === item._id).length

  const handleClickItem = () => {
    onClick(item)
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item
  })

  return (
    <li ref={dragRef} className={style.ingridientItem} onClick={handleClickItem}>
      {
        amount > 0 && (<Counter count={item.type === 'bun' ? 2 * amount : amount} size='default' />)
      }
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

IngredientItem.propTypes = {
  item: ingredientPropType,
  onClick: PropTypes.func,
}

export default IngredientItem
