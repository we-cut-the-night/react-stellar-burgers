import {
  INGREDIENTS_ALL_REQUEST,
  INGREDIENTS_ALL_SUCCESS,
  INGREDIENTS_ALL_FAIL,
  SET_INGRIDIENT_TAB,
} from "services/actions"
import { getIngredientsAll } from "./ingredients"
import { initialBurgerIngredients as initialState } from "services/initialData"

const mockTabData = 'sauce'

const mockIngredientsData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }]

describe("testing burgerIngredients reducer", () => {
  it('should return initial state with ingredientsAllRequest is true', () => {
    const action = {
      type: INGREDIENTS_ALL_REQUEST,
    };
    const state = getIngredientsAll(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsAllRequest: true,
    });
  });
  it('should return initial state with mockIngredientsData and ingredientsAllRequest', () => {
    const action = {
      type: INGREDIENTS_ALL_SUCCESS,
      ingredientsData: mockIngredientsData,
    };
    const state = getIngredientsAll(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsAll: mockIngredientsData,
    });
    expect(state.ingredientsAllRequest).toBe(false);
    expect(state.ingredientsAllFail).toBe(false);
  });
  it('should return initial state with ingredientsAllRequest is false and ingredientsAllFail is true', () => {
    const action = {
      type: INGREDIENTS_ALL_FAIL,
    };
    const state = getIngredientsAll(initialState, action);
    expect(state.ingredientsAllRequest).toBe(false);
    expect(state.ingredientsAllFail).toBe(true);
  });
  it('should return initial state with currentIngredientTab equal mockTabData', () => {
    const action = {
      type: SET_INGRIDIENT_TAB,
      currentIngredientTab: mockTabData,
    };
    const state = getIngredientsAll(initialState, action);
    expect(state).toEqual({
      ...initialState,
      currentIngredientTab: mockTabData,
    });
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = getIngredientsAll(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
