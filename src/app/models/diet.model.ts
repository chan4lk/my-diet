// Generated by https://quicktype.io

export interface DietResponse {
  userId: number;
  planId: number;
  date: string;
  message: string;
  extraCalorieAmount: number;
  isError: boolean;
  foodItems: FoodItem[];
}

export interface DietDetails {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  total: number;
}

export interface FoodItem {
  id: number;
  name: string;
  fat: number;
  protine: number;
  carbohydrate: number;
  isVeg: boolean;
  type: number;
  foodCategory: number;
  foodQuantity: number;
}