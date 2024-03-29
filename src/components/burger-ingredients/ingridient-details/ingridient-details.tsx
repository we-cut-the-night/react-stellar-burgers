import style from "./ingridient-details.module.css";
import { getIngredientDetails } from "services/selectors";
import { FC } from "react";
import { useAppSelector } from "hooks";

const IngridientDetails: FC = () => {
  const { ingredientDetails } = useAppSelector(getIngredientDetails);

  const ingridientValue = [
    {
      title: "Калории, ккал",
      value: ingredientDetails.calories,
    },
    {
      title: "Белки, г",
      value: ingredientDetails.proteins,
    },
    {
      title: "Жиры, г",
      value: ingredientDetails.fat,
    },
    {
      title: "Углеводы, г",
      value: ingredientDetails.carbohydrates,
    },
  ];

  return (
    <div className={`${style.ingridientDetails} pt-10 pb-15`}>
      <h2
        className={`${style.ingridientDetailsTitle} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img src={ingredientDetails.image_large} alt={ingredientDetails.name} />
      <p
        className={`${style.ingridientDetailsName} mt-4 mb-8 text text_type_main-medium`}
      >
        {ingredientDetails.name}
      </p>
      <ul className={`${style.ingridientDetailsList} mb-5`}>
        {ingridientValue.map((item, i) => {
          return (
            <li key={i} className={style.detailsListItem}>
              <p
                className={`${style.detailsItemValue} mb-2 text text_type_main-default`}
              >
                {item.title}
              </p>
              <p
                className={`${style.detailsItemValue} mb-2 text text_type_main-default`}
              >
                {item.value}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngridientDetails;
