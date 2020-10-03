import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

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

  constructor() {}

  ngOnInit() {}

  slideChanged(slider: IonSlides) {
    slider.getActiveIndex().then((index) => (this.currentMenu = index));
  }
}
