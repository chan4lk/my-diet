import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter, ViewWillLeave {
  constructor(
    private auth: AuthService,
    private user: UserService,
    private store: StoreService,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.auth.logout();
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  login(email, password) {
    this.auth
      .login(email, password)
      .pipe(
        switchMap((token) => {
          return this.user.getByEmail(email);
        })
      )
      .subscribe((user) => {
        this.store.setUser(user);
        this.router.navigate(['/home']);
      });
  }
}
