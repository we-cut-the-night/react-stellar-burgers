import { useParams } from 'react-router-dom'
import styles from './ingredient-details.module.css'
import { getBurrentIngredients } from 'services/selectors'
import { FC } from 'react'
import { IIngredientData } from 'utils/types'
import { useAppSelector } from 'hooks'

const IngredientDetails: FC = () => {
  const { id } = useParams()
  const { ingredientsAll }: {ingredientsAll: IIngredientData[]} = useAppSelector(getBurrentIngredients)
  const currentIngredient: IIngredientData = ingredientsAll?.filter(item => item._id === id)[0]

  return (
    <section className={styles.root}>
      <div className={styles.cover}>
        <div className={styles.headerWrapper}>
          <h2
            className={`${
              styles.header
            } text text_type_main-large`}
          >
            Детали ингредиента
          </h2>
        </div>
        <img
          src={currentIngredient?.image_large}
          alt={currentIngredient?.name}
        />
        <h4
          className={`${
            styles.ingredientName
          } mt-4 mb-8 text text_type_main-medium`}
        >
          {currentIngredient?.name}
        </h4>
        <ul className={`${styles.ingredientList} mb-5`}>
          <li className={styles.ingredientListItem}>
            <p
              className={`${
                styles.ingredientItemInfo
              } mb-2 text text_type_main-default`}
            >
              Калории, ккал
            </p>
            <p
              className={`${
                styles.ingredientItemValue
              } text text_type_digits-default`}
            >
              {currentIngredient?.calories}
            </p>
          </li>
          <li className={styles.ingredientListItem}>
            <p
              className={`${
                styles.ingredientItemInfo
              } mb-2 text text_type_main-default`}
            >
              Белки, г
            </p>
            <p
              className={`${
                styles.ingredientItemValue
              } text text_type_digits-default`}
            >
              {currentIngredient?.proteins}
            </p>
          </li>
          <li className={styles.ingredientListItem}>
            <p
              className={`${
                styles.ingredientItemInfo
              } mb-2 text text_type_main-default`}
            >
              Жиры, г
            </p>
            <p
              className={`${
                styles.ingredientItemValue
              } text text_type_digits-default`}
            >
              {currentIngredient?.fat}
            </p>
          </li>
          <li className={styles.ingredientListItem}>
            <p
              className={`${
                styles.ingredientItemInfo
              } mb-2 text text_type_main-default`}
            >
              Углеводы, г
            </p>
            <p
              className={`${
                styles.ingredientItemValue
              } text text_type_digits-default`}
            >
              {currentIngredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default IngredientDetails
