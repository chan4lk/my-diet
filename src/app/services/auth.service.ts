import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';
import { SignupModel } from '../models/auth.models';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Create an instance of the AuthService
   */
  constructor(private api: ApiService, private storage: StorageService) {}

  // tslint:disable-next-line: variable-name
  private _token: BehaviorSubject<string> = new BehaviorSubject('');
  public token = this._token.asObservable();

  login(login: string, password: string) {
    return this.api.post(environment.auth, { login, password }).pipe(
      map((res: { token: string }) => {
        this.storage.setItem('__token', res);
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
    this.storage.removeItem('__token');
  }
}
