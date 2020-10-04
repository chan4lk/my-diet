import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItem } from 'src/app/models/diet.model';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() showValue = true;
  @Input() isButton = true;
  @Input() value: FoodItem = {
    id: 0,
    name: '',
    carbohydrate: 0,
    fat: 0,
    protine: 0,
    foodCategory: 0,
    foodQuantity: 0,
    isVeg: false,
    type: 0,
  };
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate() {
    this.router.navigate(['/edit']);
  }
}
