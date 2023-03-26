import { useState, useEffect } from 'react'
import { ingridientTypes } from '../../utils/constants'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { ADD_INGREDIENT } from '../../services/actions'
import { handleOrder } from '../../services/api'
import ConstructorItem from './constructor-item/constructor-item'
import styles from './burger-constructor.module.css'

function BurgerConstructor() {
  const dispatch = useDispatch()
  const constructor = useSelector(store => store.burgerConstructor.constructor)

  const [order, setOrder] = useState({
    buns: {},
    middle: [],
  })
  const [totalPrice, setTotalPrice] = useState(0)

  const handleDrop = (item) => {
    dispatch({
      type: ADD_INGREDIENT,
      item: item,
    })
  }

  const handleOrderClick = () => {
    const ingredients = constructor.map(item => item._id)
    dispatch(handleOrder({ ingredients }));
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      handleDrop(item);
    }
  })

  useEffect(() => {
    const buns = constructor.filter(item => item.type === ingridientTypes[0].type)
    const middle = constructor.filter(item => item.type !== ingridientTypes[0].type)

    if (constructor.length) {
      setOrder({
        buns: buns[0],
        middle: middle,
      })
    } else {
      setOrder({
        buns: {},
        middle: [],
      })
    }
  }, [constructor])

  useEffect(() => {
    const priceBun = order.buns?.price ? order.buns.price : 0
    const priceMiddle = order.middle?.length ? order.middle.reduce((sum, item) => sum = sum + item.price, 0) : 0
    setTotalPrice(priceBun * 2 + priceMiddle)
  }, [order])

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor} pt-25 ${isHover && styles.burgerConstructorHovering
      }`}>
      {
        !constructor.length &&
        (
          <p className={`${styles.burgerConstructorEmpty} text text_type_main-default`}>
            Чтобы сделать заказ, перетащите ингридиенты сюда и соберите бургер
          </p>
        )
      }
      {order.buns?.name && (
        <div className={`${styles.burgerConstructor__item} mr-4 mb-4 pl-8`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${order.buns.name} (верх)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
        </div>
      )}
      <ul className={`${styles.burgerConstructor__itemList}`}>
        {
          order.middle?.map((item, i) => <ConstructorItem key={item.timeId} index={i} data={item} order={order} />)
        }
      </ul>
      {order.buns?.name && (
        <div className={`${styles.burgerConstructor__item} mt-4 mr-4 pl-8`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${order.buns.name} (низ)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
        </div>
      )}
      <div className={`${styles.burgerConstructor__price} mt-10 mr-2 mb-10`}>
        <p className='text text_type_digits-medium mr-2'>
          {totalPrice && totalPrice}
        </p>
        <div className={`${styles.burgerConstructor__priceCurrency} mr-10`}>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType='button' type='primary' size='large' onClick={handleOrderClick} disabled={!totalPrice}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
