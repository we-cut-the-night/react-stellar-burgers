import {
  IIngredientData,
  IIngredientDataWithTimeId,
} from "../../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { OPEN_INGREDIENT_DETAILS } from "../../../services/actions";
import style from "./ingridient-item.module.css";
import { Link, useLocation } from "react-router-dom";
import { getBurgerConstructor } from "services/selectors";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "hooks";

const IngredientItem: FC<{ item: IIngredientData }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = item._id;
  const { constructor }: { constructor: IIngredientDataWithTimeId[] } =
    useAppSelector(getBurgerConstructor);
  const amount = constructor?.filter((i) => i._id === item._id).length;

  const handleClickItem = () => {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      ingredientDetails: item,
    });
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <Link
      key={id}
      to={{ pathname: `/ingredients/${id}` }}
      state={{ background: location }}
      className={style.link}
    >
      <li
        ref={dragRef}
        className={style.ingridientItem}
        onClick={handleClickItem}
      >
        {amount > 0 && (
          <Counter
            count={item.type === "bun" ? 2 * amount : amount}
            size="default"
          />
        )}
        <img className="ml-4 mr-4" src={item.image} alt={item.name} />
        <div className={`${style.ingridientItem__price} mt-1 mb-1`}>
          <p className="text text_type_digits-default pr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h4
          className={`${style.ingridientItem__name} text text_type_main-default`}
        >
          {item.name}
        </h4>
      </li>
    </Link>
  );
};

export default IngredientItem;
