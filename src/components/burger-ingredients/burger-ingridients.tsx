import { FC, useRef } from "react";
import IngredientType from "./ingridient-type/ingridient-type";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingridients.module.css";
import { ingridientTypes } from "../../utils/constants";
import { IIngredientData } from "../../utils/types";
import { SET_INGRIDIENT_TAB } from "../../services/actions";
import { getBurrentIngredients } from "services/selectors";
import { useAppDispatch, useAppSelector } from "hooks";

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredientsAll }: { ingredientsAll: IIngredientData[] } = useAppSelector(
    getBurrentIngredients
  );
  const { currentIngredientTab } = useAppSelector(getBurrentIngredients);
  const ingridientList = useRef<HTMLUListElement>(null);
  const bun = useRef<HTMLLIElement>(null);
  const sauce = useRef<HTMLLIElement>(null);
  const main = useRef<HTMLLIElement>(null);

  const handleClickTab = (type: string) => {
    const tabElement: HTMLLIElement | null = document.querySelector(`#${type}`);
    tabElement?.scrollIntoView({ behavior: "smooth" });
  };
  const filterData = (data: IIngredientData[], type: string) =>
    data.filter((ingridient) => ingridient.type === type);
  const calcRefType = (type: string) => {
    let ref = null;
    if (type === ingridientTypes[0].type) {
      ref = bun;
    } else if (type === ingridientTypes[1].type) {
      ref = sauce;
    } else if (type === ingridientTypes[2].type) {
      ref = main;
    }
    return ref;
  };

  const handleScrollIngredients = () => {
    if (
      ingridientList.current &&
      bun.current &&
      sauce.current &&
      main.current
    ) {
      const listCurrentTop =
        ingridientList?.current?.getBoundingClientRect()?.top;
      const bunDelta = Math.abs(
        listCurrentTop - bun?.current?.getBoundingClientRect()?.top
      );
      const sauceDelta = Math.abs(
        listCurrentTop - sauce?.current?.getBoundingClientRect()?.top
      );
      const mainDelta = Math.abs(
        listCurrentTop - main?.current?.getBoundingClientRect()?.top
      );
      const minDelta = Math.min(bunDelta, sauceDelta, mainDelta);

      let tab = '';
      if (minDelta === bunDelta) {
        tab = ingridientTypes[0].type;
      } else if (minDelta === sauceDelta) {
        tab = ingridientTypes[1].type;
      } else if (minDelta === mainDelta) {
        tab = ingridientTypes[2].type;
      }

      dispatch({
        type: SET_INGRIDIENT_TAB,
        currentIngredientTab: tab,
      });
    }
  };

  return (
    <section className={styles.burgerIngridients}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <ul className={`${styles.burgerIngridients__nav}`}>
        {ingridientTypes.map((item, i) => {
          return (
            <Tab
              key={i}
              value={item.type}
              active={currentIngredientTab === item.type}
              onClick={handleClickTab}
            >
              {item.title}
            </Tab>
          );
        })}
      </ul>
      <ul
        ref={ingridientList}
        className={`${styles.burgerIngridients__typeList} mt-10`}
        onScroll={handleScrollIngredients}
      >
        {ingridientTypes.map((item, i) => (
          <IngredientType
            key={i}
            id={item.type}
            ref={calcRefType(item.type)}
            title={item.title}
            items={filterData(ingredientsAll, item.type)}
          />
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
