import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  public userData$ = this.user.asObservable();

  public setUser(user: UserDetailsResponse) {
    this.user.next(user);
  }
}
