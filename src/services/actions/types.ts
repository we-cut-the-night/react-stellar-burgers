import {
  IIngredientData,
  IIngredientDataWithTimeId,
  IOrder,
} from "utils/types";
import {
  ADD_INGREDIENT,
  CLOSE_INGREDIENT_DETAILS,
  INGREDIENTS_ALL_FAIL,
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  LOGIN,
  LOGOUT,
  OPEN_INGREDIENT_DETAILS,
  ORDER_CLOSE,
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  REMOVE_INGREDIENT,
  RESET_INGREDIENTS,
  RESET_PASSWORD_END,
  RESET_PASSWORD_START,
  SET_INGRIDIENT_TAB,
  SET_USER_DATA,
  UPDATE_INGREDIENTS,
} from ".";

export interface IIngredientsAllRequestAction {
  readonly type: typeof INGREDIENTS_ALL_REQUEST;
}

export interface IIngredientsAllSuccessAction {
  readonly type: typeof INGREDIENTS_ALL_SUCCESS;
  ingredientsData: IIngredientData[];
}

export interface IIngredientsAllFailAction {
  readonly type: typeof INGREDIENTS_ALL_FAIL;
}

export interface ISetIngredintTabAction {
  readonly type: typeof SET_INGRIDIENT_TAB;
  currentIngredientTab: string;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  id: string;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  item: IIngredientData,
}

export interface IUpdateIngredientsAction {
  readonly type: typeof UPDATE_INGREDIENTS;
  constructor: IIngredientDataWithTimeId[] | []
}

export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IOrderCloseAction {
  readonly type: typeof ORDER_CLOSE;
}

export interface IOrderFailAction {
  readonly type: typeof ORDER_FAIL;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  order: IOrder;
}

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOpenIngredientDetailsAction {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
  ingredientDetails: IIngredientData;
}

export interface ICloseIngredientDetailsAction {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  data: {
    name: string;
    email: string;
  };
}

export interface ILoginAction {
  readonly type: typeof LOGIN;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}

export interface IRestoreStartedAction {
  readonly type: typeof RESET_PASSWORD_START;
}

export interface IRestoreFinishedAction {
  readonly type: typeof RESET_PASSWORD_END;
}

export type TApplicationActions =
  | IIngredientsAllRequestAction
  | IIngredientsAllSuccessAction
  | IIngredientsAllFailAction
  | ISetIngredintTabAction
  | IRemoveIngredientAction
  | IAddIngredientAction
  | IUpdateIngredientsAction
  | IResetIngredientsAction
  | IOrderCloseAction
  | IOrderFailAction
  | IOrderSuccessAction
  | IOrderRequestAction
  | IOpenIngredientDetailsAction
  | ICloseIngredientDetailsAction
  | ISetUserDataAction
  | ILoginAction
  | ILogoutAction
  | IRestoreStartedAction
  | IRestoreFinishedAction;
