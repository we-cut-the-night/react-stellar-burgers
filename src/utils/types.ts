import { store } from 'index';
import { ReactNode } from 'react';

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
  timeId: number;
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
