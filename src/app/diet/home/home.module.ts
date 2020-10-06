import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HomePage } from './home.page';
import { ComponentModule } from 'src/app/components/components.module';
import { KiloFormaterPipe } from 'src/app/components/number-pipe/number.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  providers: [LocalNotifications, KiloFormaterPipe],
})
export class HomePageModule {}
