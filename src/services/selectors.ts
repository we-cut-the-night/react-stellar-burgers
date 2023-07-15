import { RootState } from "utils/types"

export const getIngredientDetailsIsOpen = (store: RootState) => store.ingredientDetails.isOpen
export const getBurgerConstructor = (store: RootState) => store.burgerConstructor
export const getStoreUserData = (store: RootState) => store.userData
export const getOrder = (store: RootState) => store.order
export const getBurrentIngredients = (store: RootState) => store.burgerIngredients
export const getIngredientDetails = (store: RootState) => store.ingredientDetails
