import { store } from 'index';
import { ReactNode } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TApplicationActions } from 'services/actions/types';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type TIngredientList = string[];

export interface IIngredientData {
  readonly _id: string,
  readonly type: string,
  readonly name: string,
  readonly price: number,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly calories: number,
  readonly carbohydrates: number,
  readonly proteins: number,
  readonly fat: number,
}

export interface IIngredientDataWithTimeId extends IIngredientData {
  timeId: string;
}

export type TStoreDispatch = typeof store.dispatch;

export interface IStringValues {
  [name: string]: string;
}

export interface IPropsModalOverlay {
  onClose: () => void;
}

export interface IPropsModal extends IPropsModalOverlay {
  children: ReactNode;
}

export interface IPropsElement {
  element: any;
}

export interface IPropsConstructorItem {
  index: number;
  data: IIngredientDataWithTimeId;
  middle: IIngredientDataWithTimeId[];
  buns: IIngredientDataWithTimeId[];
}

export interface IPropsIngridientType {
  id: string;
  title: string;
  items: IIngredientData[];
}

export interface IOrder {
  readonly id: string;
  readonly number: number;
}

export interface IWSOrder {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}
