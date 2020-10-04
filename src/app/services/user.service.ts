import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetailsResponse } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   *
   */
  constructor(private api: ApiService) {}

  getByEmail(email: string) {
    return this.api.get<UserDetailsResponse>(
      `${environment.users}/ByEmail/${email}`
    );
  }
}
