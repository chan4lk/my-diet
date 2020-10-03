import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
})
export class FoodItemComponent implements OnInit {
  @Input() showValue = true;
  @Input() isButton = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigate() {
    this.router.navigate(['/edit']);
  }
}
