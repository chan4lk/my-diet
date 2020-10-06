import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StoreService } from 'src/app/services/store.service';
import { DietService } from 'src/app/services/diet.service';
import { switchMap, take, takeWhile } from 'rxjs/operators';
import { DietDetails, FoodItem } from 'src/app/models/diet.model';
import { Router } from '@angular/router';
import { GaugeComponent } from 'src/app/components/gauge/gauge.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillLeave, ViewWillEnter {
  slidesOptions = {
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: false,
    loop: false,
  };

  currentMenu = 0;
  active = true;
  diet: DietDetails = {
    breakfast: [],
    lunch: [],
    dinner: [],
    total: 0,
    max: 0,
  };

  total = 0;
  @ViewChild(GaugeComponent, { static: true }) gauge: GaugeComponent;
  constructor(
    private localNotifications: LocalNotifications,
    private store: StoreService,
    private dietService: DietService,
    private router: Router
  ) {}

  ngOnInit() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Update your progress',
      sound: true ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: 'abc' },
    });

    this.store.diet$.pipe(takeWhile(() => this.active)).subscribe((diet) => {
      this.diet = diet;
      this.total = diet.total;
      this.gauge.draw();
    });

    this.doRefresh(null);
  }

  ionViewWillEnter() {
    this.active = true;
  }

  ionViewDidEnter() {
    this.gauge.draw();
  }

  slideChanged(slider: IonSlides) {
    slider.getActiveIndex().then((index) => (this.currentMenu = index));
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.store.userData$
      .pipe(
        takeWhile(() => this.active),
        switchMap((user) => {
          return this.dietService.getDiet(user.id, new Date());
        })
      )
      .subscribe((diet) => {
        const data = this.dietService.format(diet);
        this.store.setDiet(data);
        if (event) {
          event.target.complete();
        }
      });
  }

  navigate(food: FoodItem) {
    this.router.navigate(['/edit', food.type, food.id]);
  }

  ionViewWillLeave(): void {
    this.active = false;
  }
}
