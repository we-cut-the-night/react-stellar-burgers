import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop, useDrag } from 'react-dnd'
import { UPDATE_INGREDIENTS, REMOVE_INGREDIENT } from '../../../services/actions'
import styles from './constructor-item.module.css'

function ConstructorItem({ index, data, order }) {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const middle = order.middle
  const buns = [order.buns]

  function handleDeleteItem() {
    dispatch({
      type: REMOVE_INGREDIENT,
      id: data.timeId
    })
  }

  const dragItem = (indexDrag, indexHover) => {
    const dragItem = middle[indexDrag]
    const hoverItem = middle[indexHover]

    middle[indexDrag] = hoverItem
    middle[indexHover] = dragItem

    dispatch({
      type: UPDATE_INGREDIENTS,
      constructor: [...buns, ...middle]
    })
  }

  const [{ isDrag }, drag] = useDrag({
    type: 'middle',
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'middle',
    hover: (item, monitor) => {
      const indexDrag = item.index;
      const indexHover = index;

      if (!ref.current) return;
      if (indexDrag === indexHover) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleDelta = (hoverBoundingRect.bottom - hoverBoundingRect.top) * 0.5;
      const hoverActualDelta = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (indexDrag < indexHover && hoverActualDelta < hoverMiddleDelta) return;
      if (indexDrag > indexHover && hoverActualDelta > hoverMiddleDelta) return;

      dragItem(indexDrag, indexHover);
      item.index = indexHover;
    }
  })

  const sortItemsRef = drag(drop(ref))

  return (
    <li
      className={`${styles.burgerConstructor__item} ${isDrag && styles.burgerConstructor__itemIsDrag} mr-4 mb-4`}
      ref={sortItemsRef}
    >
      <div className='mr-2'>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        isLocked={false}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={handleDeleteItem}
      />
    </li>
  )
}

export default ConstructorItem
