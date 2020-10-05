import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DietDetails } from '../models/diet.model';
import { UserDetailsResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private user: BehaviorSubject<UserDetailsResponse> = new BehaviorSubject({
    id: 0,
    name: '',
    surname: '',
    email: '',
  });
  private diet: BehaviorSubject<DietDetails> = new BehaviorSubject({
    breakfast: [],
    lunch: [],
    dinner: [],
    total: 0,
  });

  public userData$ = this.user.asObservable();
  public diet$ = this.diet.asObservable();

  public setUser(user: UserDetailsResponse) {
    this.user.next(user);
  }

  public setDiet(diet: DietDetails) {
    this.diet.next(diet);
  }
}
