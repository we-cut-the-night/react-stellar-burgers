import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ingridientTypes } from '../../utils/constants'
import {
  Button,
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-constructor.module.css'

function BurgerConstructor({ data, onClick }) {
  const [order, setOrder] = useState({
    top: {},
    middle: [],
    bottom: {},
  })
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const bunList = data.filter(item => item.type === ingridientTypes[0].type)
    const sauceList = data.filter(item => item.type === ingridientTypes[1].type)
    const mainList = data.filter(item => item.type === ingridientTypes[2].type)

    data.length && setOrder({
      top: bunList[1],
      middle: [sauceList[1], mainList[8], mainList[1], mainList[8], sauceList[1], mainList[8]
      ],
      bottom: bunList[0],
    })
  }, [data])

  useEffect(() => {
    const priceTop = order.top.price ? order.top.price : 0
    const priceMiddle = order.middle.lenth ? order.middle.reduce((sum, item) => sum = sum + item.price, 0) : 0
    const priceBottom = order.bottom.price ? order.bottom.price : 0
    setTotalPrice(priceTop + priceMiddle + priceBottom)
  }, [order])

  return (
    <section className={`${styles.burgerConstructor} pt-25`}>
      {order.top.name && (
        <div className={`${styles.burgerConstructor__item} mr-4 mb-4 pl-8`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${order.top.name} (верх)`}
            price={order.top.price}
            thumbnail={order.top.image}
          />
        </div>
      )}
      <ul className={`${styles.burgerConstructor__itemList}`}>
        {order.middle.map((item, i) => {
          return (
            <div key={i} className={`${styles.burgerConstructor__item} mr-4 mb-4`}>
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
      {order.bottom.name && (
        <div className={`${styles.burgerConstructor__item} mt-4 mr-4 pl-8`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${order.bottom.name} (низ)`}
            price={order.bottom.price}
            thumbnail={order.bottom.image}
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
        {totalPrice ? (
          <Button htmlType='button' type='primary' size='large' onClick={onClick}>
            Оформить заказ
          </Button>
        ) : (
          <Button htmlType='button' type='primary' size='large' disabled>
            Оформить заказ
          </Button>
        )}
      </div>
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
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(constructorPropTypes),
  onClick: PropTypes.func,
};

export default BurgerConstructor
