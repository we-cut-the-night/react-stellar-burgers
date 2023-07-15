import { forwardRef } from "react";
import IngredientItem from "../ingridient-item/ingridient-item";
import { IPropsIngridientType } from "../../../utils/types";
import styles from "./ingridient-type.module.css";

const IngredientType = forwardRef<HTMLLIElement, IPropsIngridientType>(
  ({ id, title, items }, ref) => {
    return (
      <li id={id} ref={ref}>
        <h3 className="text text_type_main-medium">{title}</h3>
        <ul className={`${styles.ingridientList} pt-6 pb-10 pl-4 pr-4`}>
          {items.map((item) => {
            return <IngredientItem key={item._id} item={item} />;
          })}
        </ul>
      </li>
    );
  }
);

export default IngredientType;
