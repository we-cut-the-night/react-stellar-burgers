import { IIngredientData, IIngredientDataWithTimeId } from "./types";

export const getOrderPrice = (
  data: IIngredientData[] | IIngredientDataWithTimeId[]
): number => {
  const buns = data?.filter((item) => (item.type === "bun" ? item : null))
  const middle = data?.filter((item) => (item.type !== "bun" ? item : null))
  const bunPrice = buns && buns?.length > 0 ? buns[0].price : 0
  const middlePrice: number = middle?.reduce(
    (sum, item) => (sum = sum + item.price),
    0
  );

  return bunPrice * 2 + (middlePrice ? middlePrice : 0)
};
