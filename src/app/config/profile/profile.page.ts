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
  get gender() {
    return this.form.get('gender').value;
  }

  set gender(ev: CustomEvent) {
    this.form.get('gender').patchValue(ev.detail.value);
  }

  ngOnInit() {
    this.form = this.fb.group({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('0', Validators.required),
    });

    this.targetForm = this.fb.group({
      target: new FormControl('', Validators.required),
    });
  }

  next(slides: IonSlides) {
    slides.slideNext();
  }
  save() {}
}
