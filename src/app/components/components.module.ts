import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FoodItemComponent } from './food-item/food-item.component';
import { GaugeComponent } from './gauge/gauge.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [GaugeComponent, FoodItemComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [GaugeComponent, FoodItemComponent, HeaderComponent],
})
export class ComponentModule {}
