import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() showValue = true;
  @Input() isButton = true;

  constructor() {}

  ngOnInit() {}
}
