import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';
import { SignupModel } from '../models/auth.models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   *
   */
  constructor(private api: ApiService) {}

  private _token: BehaviorSubject<string> = new BehaviorSubject('');
  private token = this._token.asObservable();

  login(login: string, password: string) {
    return this.api.post(environment.auth, { login, password }).pipe(
      map((res: { token: string }) => {
        localStorage.setItem('__token', res.token);
        this._token.next(res.token);
        return res.token;
      })
    );
  }

  signup(data: SignupModel) {
    return this.api
      .post(environment.users, data)
      .pipe(switchMap(() => this.login(data.email, data.auth.password)));
  }

  logout() {
    this._token.next('');
    localStorage.removeItem('__token');
  }
}
