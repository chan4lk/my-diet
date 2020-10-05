import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { DietDetails, FoodItem } from 'src/app/models/diet.model';
import { FoodService } from 'src/app/services/food.service';
import { StoreService } from 'src/app/services/store.service';
import { toFoodItem } from 'src/app/services/utils';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private store: StoreService
  ) {}
  private menus = {
    1: 'breakfast',
    2: 'lunch',
    3: 'dinner',
  };
  active = true;
  menu = 1;
  foods: FoodItem[] = [];
  diet: DietDetails = {
    breakfast: [],
    lunch: [],
    dinner: [],
    max: 0,
    total: 0,
  };

  ionViewWillEnter() {
    this.active = true;
  }

  ionViewWillLeave() {
    this.active = false;
  }
  ngOnInit() {
    this.route.paramMap
      .pipe(takeWhile(() => this.active))
      .subscribe((params) => {
        this.menu = +params.get('menu');
        this.foods.forEach((f) => (f.type = this.menu));
      });
    this.foodService
      .getFoods()
      .pipe(
        takeWhile(() => this.active),
        map((foods) => foods.map((f) => toFoodItem(f, this.menu))),
        switchMap((foods) =>
          this.store.diet$.pipe(
            tap((diet) => (this.diet = diet)),
            map((diet) =>
              foods.filter(
                (f) =>
                  diet.breakfast.findIndex((b) => b.id === f.id) < 0 &&
                  diet.lunch.findIndex((b) => b.id === f.id) < 0 &&
                  diet.dinner.findIndex((b) => b.id === f.id) < 0
              )
            )
          )
        )
      )
      .subscribe((foods) => (this.foods = foods));
  }

  clicked(food: FoodItem) {
    food.type = this.menu;
    this.diet[this.menus[this.menu]].push(food);
    this.router.navigate(['/edit', food.type, food.id]);
  }
}
