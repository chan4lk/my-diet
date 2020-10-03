import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FoodItemComponent } from './food-item/food-item.component';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [GaugeComponent, FoodItemComponent],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [GaugeComponent, FoodItemComponent],
})
export class ComponentModule {}
