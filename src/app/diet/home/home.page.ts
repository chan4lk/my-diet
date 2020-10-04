import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StoreService } from 'src/app/services/store.service';
import { DietService } from 'src/app/services/diet.service';
import { switchMap, takeWhile } from 'rxjs/operators';
import { DietResponse } from 'src/app/models/diet.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  slidesOptions = {
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: false,
    loop: false,
  };

  currentMenu = 0;
  active = true;
  diet: DietResponse;

  constructor(
    private localNotifications: LocalNotifications,
    private store: StoreService,
    private dietService: DietService
  ) {}

  ngOnInit() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Update your progress',
      sound: true ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: 'abc' },
    });

    this.doRefresh(null);
  }

  slideChanged(slider: IonSlides) {
    slider.getActiveIndex().then((index) => (this.currentMenu = index));
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.store.userData$
      .pipe(
        takeWhile(() => this.active),
        switchMap((user) => this.dietService.getDiet(user.id, new Date()))
      )
      .subscribe((diet) => {
        this.diet = diet;
        if (event) {
          event.target.complete();
        }
      });
  }

  ngOnDestroy(): void {
    this.active = false;
  }
}
