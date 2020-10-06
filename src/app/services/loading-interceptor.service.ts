import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingCtrl: LoadingController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();

    // Important: Note the .toPromise()
    return next
      .handle(req)
      .pipe(finalize(async () => await loading.dismiss()))
      .toPromise();
  }
}
