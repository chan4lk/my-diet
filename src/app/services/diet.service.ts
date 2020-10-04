import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DietResponse } from '../models/diet.model';
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
}
