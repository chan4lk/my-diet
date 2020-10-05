import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private store: StoreService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.userData$.pipe(
      map((user) => !!user.id),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
