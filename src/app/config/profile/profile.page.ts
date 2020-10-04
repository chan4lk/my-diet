import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private fb: FormBuilder) {}
  form: FormGroup;
  targetForm: FormGroup;
  goalForm: FormGroup;
  activityForm: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('0', Validators.required),
    });
    this.activityForm = this.fb.group({
      activityLevel: new FormControl('0', Validators.required),
    });

    this.targetForm = this.fb.group({
      target: new FormControl('0', Validators.required),
    });
    this.goalForm = this.fb.group({
      goal: new FormControl('0', []),
      weight: new FormControl('0', [Validators.required, Validators.min(1)]),
    });

    this.targetForm.valueChanges.subscribe((values) => {
      if (values.target !== '1') {
        this.goalForm.controls.weight.setValidators([
          Validators.required,
          Validators.min(1),
        ]);
      } else {
        this.goalForm.controls.weight.clearValidators();
      }
    });
  }

  next(slides: IonSlides) {
    slides.slideNext();
  }

  save() {}
}
