import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Plans',
      url: '/plan',
      icon: 'archive',
    },
    {
      title: 'Signout',
      url: '/login',
      icon: 'trash',
    },
  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
