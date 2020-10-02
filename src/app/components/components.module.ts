import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodItemComponent } from './food-item/food-item.component';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [GaugeComponent, FoodItemComponent],
  imports: [IonicModule],
  exports: [GaugeComponent, FoodItemComponent],
})
export class ComponentModule {}
