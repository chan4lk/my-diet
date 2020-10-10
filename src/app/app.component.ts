import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'My Diet',
      url: '/home',
      icon: 'mail',
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'paper-plane',
    },
    {
      title: 'Progress',
      url: '/progress',
      icon: 'heart',
    },
    {
      title: 'Report',
      url: '/report',
      icon: 'calendar',
    },
    {
      title: 'Signout',
      url: '/login',
      icon: 'trash',
    },
  ];
  public labels = [];
  public email = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: StoreService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.store.userData$.subscribe((user) => {
      this.email = user.email;
    });
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
