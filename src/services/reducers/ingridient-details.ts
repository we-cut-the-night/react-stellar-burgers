import { initialIngredientDetails } from "../initialData";
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions";
import { TApplicationActions } from "services/actions/types";

export const ingredientDetails = (
  state = initialIngredientDetails,
  action: TApplicationActions
) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: action.ingredientDetails,
        isOpen: true,
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: {
          _id: "",
          type: "",
          name: "",
          price: 0,
          image: "",
          image_mobile: "",
          image_large: "",
          calories: 0,
          carbohydrates: 0,
          proteins: 0,
          fat: 0,
        },
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
