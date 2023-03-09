import IngredientType from './ingridient-type/ingridient-type'
import styles from './burger-ingridients.module.css'

const ingridientTypes = [
  {
    title: 'Булки',
    type: 'bun',
  },
  {
    title: 'Соусы',
    type: 'sauce',
  },
  {
    title: 'Начинки',
    type: 'main',
  },
]

function BurgerIngredients({ data }) {
  return (
    <section className={styles.burgerIngridients}>
      <ul>
        {ingridientTypes.map((item, i) => {
          const filteredData = data.filter(ingridient => ingridient.type === item.type)
          return (
            <IngredientType key={i} title={item.title} items={filteredData} />
          )
        })}
      </ul>
    </section>
  )
}

export default BurgerIngredients
