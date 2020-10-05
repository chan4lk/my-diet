import { FoodItem } from '../models/diet.model';

export const toFixed = (value?: number, decimals: number = 0) => {
  if (!value) {
    return value;
  }
  return value.toFixed(decimals);
};

export const toCalaries = (weight: number, food: FoodItem) => {
  return (
    (weight * (food.protine * 4 + food.carbohydrate * 4 + food.fat * 9)) / 100
  );
};
