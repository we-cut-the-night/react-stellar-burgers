import { useState, useEffect, FC } from "react"
import { ingridientTypes } from "../../utils/constants"
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "../../services/actions"
import { handleOrder } from "../../services/api"
import ConstructorItem from "./constructor-item/constructor-item"
import styles from "./burger-constructor.module.css"
import { useNavigate } from "react-router-dom"
import { urls } from "../../utils/constants"
import { getBurgerConstructor, getStoreUserData } from "services/selectors"
import {
  IIngredientDataWithTimeId,
} from "utils/types";
import { IStoreBurgerConstructor } from "services/reducers/types"
import { useAppDispatch, useAppSelector } from "hooks"

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { constructor }: IStoreBurgerConstructor =
    useAppSelector(getBurgerConstructor);
  const { loggedIn } = useAppSelector(getStoreUserData);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleDrop = (item: IIngredientDataWithTimeId) => {
    dispatch({
      type: ADD_INGREDIENT,
      item: item,
    });
  };

  const handleOrderClick = () => {
    if (loggedIn) {
      const ingredients = constructor.map(item => item._id);
      dispatch(handleOrder({ ingredients }));
    } else {
      navigate(urls.login);
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: any) {
      handleDrop(item);
    },
  });

  const buns = constructor.filter(
    (item) => item.type === ingridientTypes[0].type
  );
  const middle = constructor.filter(
    (item) => item.type !== ingridientTypes[0].type
  );

  useEffect(() => {
    const priceMiddle: number = middle.reduce(
      (sum: number, item) =>
        (sum = sum + item.price),
      0
    );
    const priceBuns: number = 2 * buns[0]?.price || 0;

    setTotalPrice(priceBuns + priceMiddle);
  }, [constructor, buns, middle]);

  return (
    <section
      ref={dropTarget}
      className={`${styles.burgerConstructor} pt-25 ${
        isHover && styles.burgerConstructorHovering
      }`}
    >
      {!constructor.length && (
        <p
          className={`${styles.burgerConstructorEmpty} text text_type_main-default`}
        >
          Чтобы сделать заказ, перетащите ингридиенты сюда и соберите бургер
        </p>
      )}
      {Boolean(buns.length) && (
        <div className={`${styles.burgerConstructor__item} mr-4 mb-4 pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
      )}
      <ul className={`${styles.burgerConstructor__itemList}`}>
        {Boolean(middle.length) &&
          middle.map((item, i) => (
            <ConstructorItem
              key={item.timeId}
              index={i}
              data={item}
              middle={middle}
              buns={[buns[0]]}
            />
          ))}
      </ul>
      {Boolean(buns.length) && (
        <div className={`${styles.burgerConstructor__item} mt-4 mr-4 pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
      )}
      <div className={`${styles.burgerConstructor__price} mt-10 mr-2 mb-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <div className={`${styles.burgerConstructor__priceCurrency} mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
          disabled={!totalPrice}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
