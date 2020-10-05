import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { takeWhile } from 'rxjs/operators';
import { DietDetails, FoodItem } from 'src/app/models/diet.model';
import { StoreService } from 'src/app/services/store.service';
import { toCalaries, toFixed } from 'src/app/services/utils';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, ViewWillEnter, ViewWillLeave {
  constructor(
    private store: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}
  private menus = {
    1: 'breakfast',
    2: 'lunch',
    3: 'dinner',
  };
  food: FoodItem = {
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
  diet: DietDetails = {
    breakfast: [],
    lunch: [],
    dinner: [],
    total: 0,
    max: 0,
  };

  total = 0;

  menu = 0;
  id = 0;
  active = true;

  form: FormGroup;
  ngOnInit() {
    this.form = this.fb.group({
      weight: new FormControl(0, [Validators.required]),
    });
    this.route.paramMap.subscribe((params) => {
      this.menu = +params.get('menu');
      this.id = +params.get('id');
    });
    this.store.diet$.pipe(takeWhile(() => this.active)).subscribe((diet) => {
      this.diet = diet;
      this.food = diet[this.menus[this.menu]].find((f) => f.id === this.id);
      this.total = diet.total;
      this.form.patchValue({ weight: toFixed(this.food.foodQuantity) });
    });

    this.form.valueChanges
      .pipe(takeWhile(() => this.active))
      .subscribe((values) => {
        const value = +values.weight;
        this.total -= toCalaries(this.food.foodQuantity, this.food);
        this.food.foodQuantity = value;
        this.total += toCalaries(this.food.foodQuantity, this.food);
      });
  }

  ionViewWillEnter() {
    this.active = true;
  }

  ionViewWillLeave() {
    this.active = false;
  }

  save() {
    this.food.foodQuantity = this.form.value.weight;
    this.diet.total = this.total;
    this.active = false;
    this.store.setDiet(this.diet);

    this.router.navigate(['/home']);
  }

  remove() {
    this.diet[this.menus[this.menu]] = this.diet[this.menus[this.menu]].filter(
      (f) => f.id !== this.id
    );
    this.active = false;
    const total = this.total - toCalaries(this.food.foodQuantity, this.food);
    this.diet.total = total;
    this.store.setDiet(this.diet);
    this.router.navigate(['/home']);
  }
}
