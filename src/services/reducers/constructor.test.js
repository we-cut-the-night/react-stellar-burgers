import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_INGREDIENTS, UPDATE_INGREDIENTS } from "services/actions"
import { changeIngredients } from "./constructor"
import { initialBurgerConstructor as initialState } from "services/initialData";

const mockIngredientList = [
  { timeId: 'b0a93c76-ca69-40ba-9f14-ab059d98e3e8' },
  { timeId: '419ebd9a-cd23-4952-94d0-e4ea3d6d1a20' },
  { timeId: '37b61b14-bef4-4c6b-b29e-2999a2042297' },
]

describe("testing burgerConstructor reducer", () => {
  it('should return initial state without removed element in constructor', () => {
    const mockState = {
      constructor: mockIngredientList,
    };
    const action = {
      type: REMOVE_INGREDIENT,
      id: '419ebd9a-cd23-4952-94d0-e4ea3d6d1a20',
    };
    const state = changeIngredients(mockState, action);
    expect(state.constructor).toEqual([
      { timeId: 'b0a93c76-ca69-40ba-9f14-ab059d98e3e8' },
      { timeId: '37b61b14-bef4-4c6b-b29e-2999a2042297' },
    ]);
  });
  it('should return initial state with new element in constructor', () => {

    const action = {
      type: ADD_INGREDIENT,
      item: {
        _id: '643d69a5c3f7b9001cfa093f',
        type: 'main',
      }
    }
    const state = changeIngredients(initialState, action);

    expect(state).toEqual({
      ...initialState,
      constructor: [...initialState.constructor, { ...action.item, timeId: state.constructor[0].timeId }],
    });
  });
  it('should return initial state with new array in constructor', () => {

    const action = {
      type: UPDATE_INGREDIENTS,
      constructor: [{
        _id: '643d69a5c3f7b9001cfa093f',
        type: 'main',
      }]
    }
    const state = changeIngredients(initialState, action);

    expect(state).toEqual({
      ...initialState,
      constructor: action.constructor,
    });
  });
  it('should return initial state with empty array in constructor', () => {
    const mockState = {
      constructor: mockIngredientList,
    };

    const action = {
      type: RESET_INGREDIENTS,
    }
    const state = changeIngredients(mockState, action);

    expect(state).toEqual({
      ...initialState,
      constructor: [],
    });
  });
  it('should return initial state', () => {
    const action = {
      type: 'UNIDENTIFIED_ACTION',
    };
    const state = changeIngredients(initialState, action);
    expect(state).toEqual(initialState);
  });
});
