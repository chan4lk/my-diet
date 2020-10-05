import { FoodItem } from '../models/diet.model';
import { FoodModel } from '../models/food.model';

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

export const toFoodItem = (food: FoodModel, type: number): FoodItem => {
  return {
    ...food,
    foodQuantity: 0,
    type,
  };
};
