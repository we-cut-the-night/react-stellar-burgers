import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ingridientTypes } from '../../utils/constants'
import { ingredientPropType } from '../../utils/types'
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

function BurgerConstructor({ data, onClick }) {
  const [order, setOrder] = useState({
    buns: {},
    middle: [],
  })
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const bunList = data.filter(item => item.type === ingridientTypes[0].type)
    const sauceList = data.filter(item => item.type === ingridientTypes[1].type)
    const mainList = data.filter(item => item.type === ingridientTypes[2].type)

    data.length && setOrder({
      buns: bunList[1],
      middle: [sauceList[1], mainList[8], mainList[1], mainList[8], sauceList[1], mainList[8]
      ],
    })
  }, [data])

  useEffect(() => {
    const priceBun = order.buns.price ? order.buns.price : 0
    const priceMiddle = order.middle.lenth ? order.middle.reduce((sum, item) => sum = sum + item.price, 0) : 0
    setTotalPrice(priceBun * 2 + priceMiddle)
  }, [order])

  return (
    <section className={`${styles.burgerConstructor} pt-25`}>
      {order.buns.name && (
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
        {order.middle.map((item, i) => {
          return (
            // в одном заказе может быть несколько одинаковых ингридиентов
            <div key={i + item._id} className={`${styles.burgerConstructor__item} mr-4 mb-4`}>
              <div className='mr-2'>
                <DragIcon type='primary' />
              </div>
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>)
        })
        }
      </ul>
      {order.buns.name && (
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
        <Button htmlType='button' type='primary' size='large' onClick={onClick} disabled={!totalPrice}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  onClick: PropTypes.func,
};

export default BurgerConstructor
