import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodModel } from '../models/food.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private api: ApiService) {}

  getFoods() {
    return this.api.get<FoodModel[]>(environment.foods);
  }
}
