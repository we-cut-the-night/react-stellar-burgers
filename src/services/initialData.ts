import {
  IStoreBurgerConstructor,
  IStoreBurgerIngredients,
  IStoreIngredientDetails,
  IStoreOrder,
  IStoreUserData,
} from "./reducers/types";

export const initialBurgerIngredients: IStoreBurgerIngredients = {
  ingredientsAll: [],
  ingredientsAllRequest: false,
  ingredientsAllFail: false,
  currentIngredientTab: "bun",
};

export const initialBurgerConstructor: IStoreBurgerConstructor = {
  constructor: [],
};

export const initialIngredientDetails: IStoreIngredientDetails = {
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

export const initialOrder: IStoreOrder = {
  order: { id: "", number: 0 },
  orderRequest: false,
  orderFail: false,
  isOpen: false,
};

export const initialUserData: IStoreUserData = {
  loggedIn: false,
  email: "",
  name: "",
  resetPassword: false,
};
