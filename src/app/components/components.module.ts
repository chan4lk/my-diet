import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FoodItemComponent } from './food-item/food-item.component';
import { GaugeComponent } from './gauge/gauge.component';
import { HeaderComponent } from './header/header.component';
import { KiloFormaterPipe } from './number-pipe/number.pipe';

@NgModule({
  declarations: [
    GaugeComponent,
    FoodItemComponent,
    HeaderComponent,
    KiloFormaterPipe,
  ],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [
    GaugeComponent,
    FoodItemComponent,
    HeaderComponent,
    KiloFormaterPipe,
  ],
})
export class ComponentModule {}
