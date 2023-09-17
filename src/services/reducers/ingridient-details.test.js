import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "services/actions"
import { ingredientDetails } from "./ingridient-details"
import { initialIngredientDetails as initialState } from "services/initialData";

const mockIngredientDetails = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
}

describe("testing ingredientDetails reducer", () => {
  it('should return initial state with mockIngredientDetails and isOpen is true', () => {
    const action = {
      type: OPEN_INGREDIENT_DETAILS,
      ingredientDetails: mockIngredientDetails,
    };
    const state = ingredientDetails(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientDetails: mockIngredientDetails,
      isOpen: true,
    });
  });
  it('should return initial state and isOpen is false', () => {
    const action = {
      type: CLOSE_INGREDIENT_DETAILS,
    };
    const state = ingredientDetails(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
    expect(state.isOpen).toBe(false);
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = ingredientDetails(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
