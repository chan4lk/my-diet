import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DietResponse, FoodItem } from '../models/diet.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  /**
   *
   */
  constructor(private api: ApiService) {}

  getDiet(userId: number, date: Date) {
    return this.api.get<DietResponse>(
      `${
        environment.diet
      }?UserId=${userId}&PlanId=11&Date=${date.toDateString()}&Type=1`
    );
  }

  format(diet: DietResponse) {
    const breakfast: FoodItem[] = [];
    const lunch: FoodItem[] = [];
    const dinner: FoodItem[] = [];
    let total = 0;

    diet.foodItems.forEach((food) => {
      switch (food.type) {
        case 1:
          breakfast.push(food);
          break;
        case 2:
          lunch.push(food);
          break;
        case 3:
          dinner.push(food);
          break;
      }
      total +=
        (food.foodQuantity *
          (food.protine * 4 + food.carbohydrate * 4 + food.fat * 9)) /
        100;
    });
    return {
      breakfast,
      lunch,
      dinner,
      total,
    };
  }
}