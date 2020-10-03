import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slidesOptions = {
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: false,
    loop: false,
  };

  currentMenu = 0;

  constructor(private localNotifications: LocalNotifications) {}

  ngOnInit() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Update your progress',
      sound: true ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: 'abc' },
    });
  }

  slideChanged(slider: IonSlides) {
    slider.getActiveIndex().then((index) => (this.currentMenu = index));
  }
}
