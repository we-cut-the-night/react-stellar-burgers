import { IIngredientData, IIngredientDataWithTimeId } from "utils/types";

export interface IStoreBurgerIngredients {
  ingredientsAll: IIngredientData[] | [];
  ingredientsAllRequest: boolean;
  ingredientsAllFail: boolean;
  currentIngredientTab: string;
}

export interface IStoreBurgerConstructor {
  constructor: IIngredientDataWithTimeId[] | [];
}

export interface IStoreIngredientDetails {
  ingredientDetails: IIngredientData;
  isOpen: boolean;
}

export interface IStoreOrder {
  order: { id: string; number: number };
  orderRequest: boolean;
  orderFail: boolean;
  isOpen: boolean;
}

export interface IStoreUserData {
  loggedIn: boolean;
  email: string;
  name: string;
  resetPassword: boolean;
}

export interface IStateWSOrders {
  connected: boolean;
  data: string;
  error?: Event | null;
  info?: Event | null;
}
