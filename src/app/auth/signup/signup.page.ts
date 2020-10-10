import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MenuController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ConsentComponent } from 'src/app/components/consent/consent.component';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private store: StoreService,
    private menu: MenuController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}
  form: FormGroup;
  ngOnInit() {
    this.form = this.fb.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl(
          '',
          Validators.compose([Validators.email, Validators.required])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.minLength(6), Validators.required])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.minLength(6), Validators.required])
        ),
      },
      { validators: this.passwordConfirming }
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  async register() {
    const { accepted } = await this.presentModal();

    if (accepted) {
      const value = this.form.value;
      this.auth
        .signup({
          id: 0,
          email: value.email,
          name: value.firstName,
          surname: value.lastName,
          auth: {
            login: value.email,
            password: value.password,
            roles: 1,
          },
        })
        .pipe(
          switchMap((token) => {
            return this.user.getByEmail(value.email);
          }),
          catchError(async (e) => {
            await this.presentToast(e);
            throw Error(e);
          })
        )
        .subscribe((user) => {
          if (user) {
            this.store.setUser(user);
            this.router.navigate(['/profile']);
          }
        });
    } else {
      navigator['app'].exitApp();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ConsentComponent,
      cssClass: 'my-custom-class',
      componentProps: {},
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    return data;
  }

  async presentToast({ error }) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.auth.logout();
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
