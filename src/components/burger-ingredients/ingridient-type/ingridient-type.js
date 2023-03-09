function IngredientType({ title, items }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => {
          return (
            <li key={i}>{item.name}</li>
          )
        })}
      </ul>
    </>
  )
}

export default IngredientType
