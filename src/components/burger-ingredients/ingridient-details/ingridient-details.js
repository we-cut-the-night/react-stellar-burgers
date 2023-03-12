import {ingredientPropType} from '../../../utils/types'
import style from './ingridient-details.module.css'

function IngridientDetails({ item }) {
  const ingridientValue = [
    {
      title: 'Калории, ккал',
      value: item.calories
    },
    {
      title: 'Белки, г',
      value: item.proteins
    },
    {
      title: 'Жиры, г',
      value: item.fat
    },
    {
      title: 'Углеводы, г',
      value: item.carbohydrates
    },
  ]

  return (
    <div className={`${style.ingridientDetails} pt-10 pb-15`}>
      <h2 className={`${style.ingridientDetailsTitle} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={item.image_large} alt={item.name} />
      <p className={`${style.ingridientDetailsName} mt-4 mb-8 text text_type_main-medium`}>
        {item.name}
      </p>
      <ul className={`${style.ingridientDetailsList} mb-5`}>
        {
          ingridientValue.map((item, i) => {
            return (
              <li key={i} className={style.detailsListItem}>
                <p className={`${style.detailsItemValue} mb-2 text text_type_main-default`}>{item.title}</p>
                <p className={`${style.detailsItemValue} mb-2 text text_type_main-default`}>{item.value}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

IngridientDetails.propTypes = {
  item: ingredientPropType,
}

export default IngridientDetails
